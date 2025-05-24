const request = require("supertest");
const { mockDocClient } = require("./setup");

// 環境変数をセット
process.env.USERS_TABLE = "test-users-table";

// appをインポート（モック設定後）
const app = require("../app");

describe("Expressアプリのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /users/:userId", () => {
    test("ユーザーが存在する場合はユーザーを返す", async () => {
      const mockUser = { userId: "test-id", name: "Test User" };
      mockDocClient.send.mockResolvedValue({ Item: mockUser });

      const response = await request(app).get("/users/test-id").expect(200);

      expect(response.body).toEqual(mockUser);
      expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(Object));
    });

    test("ユーザーが存在しない場合は404を返す", async () => {
      mockDocClient.send.mockResolvedValue({ Item: null });

      const response = await request(app)
        .get("/users/nonexistent-id")
        .expect(404);

      expect(response.body).toEqual({
        error: 'Could not find user with provided "userId"',
      });
    });

    test("データベースエラー時は500を返す", async () => {
      mockDocClient.send.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/users/test-id").expect(500);

      expect(response.body).toEqual({ error: "Could not retrieve user" });
    });
  });

  describe("POST /users", () => {
    test("ユーザー作成に成功する", async () => {
      const newUser = { userId: "new-id", name: "New User" };
      mockDocClient.send.mockResolvedValue({});

      const response = await request(app)
        .post("/users")
        .send(newUser)
        .expect(200);

      expect(response.body).toEqual(newUser);
      expect(mockDocClient.send).toHaveBeenCalledWith(expect.any(Object));
    });

    test("userIdが不正な場合は400を返す", async () => {
      const invalidUser = { userId: 123, name: "Test User" };

      const response = await request(app)
        .post("/users")
        .send(invalidUser)
        .expect(400);

      expect(response.body).toEqual({ error: '"userId" must be a string' });
    });

    test("nameが不正な場合は400を返す", async () => {
      const invalidUser = { userId: "test-id", name: 123 };

      const response = await request(app)
        .post("/users")
        .send(invalidUser)
        .expect(400);

      expect(response.body).toEqual({ error: '"name" must be a string' });
    });

    test("ユーザー作成時にデータベースエラーが発生した場合は500を返す", async () => {
      const newUser = { userId: "new-id", name: "New User" };
      mockDocClient.send.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .post("/users")
        .send(newUser)
        .expect(500);

      expect(response.body).toEqual({ error: "Could not create user" });
    });
  });

  describe("404ハンドラー", () => {
    test("存在しないルートは404を返す", async () => {
      const response = await request(app).get("/unknown-route").expect(404);

      expect(response.body).toEqual({ error: "Not Found" });
    });
  });
});
