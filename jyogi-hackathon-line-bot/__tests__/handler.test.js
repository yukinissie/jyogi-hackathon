const request = require("supertest");
const { mockDocClient } = require("./setup");

process.env.USERS_TABLE = "test-users-table";
process.env.LINE_CHANNEL_ACCESS_TOKEN = "dummy-token";
process.env.LINE_CHANNEL_SECRET = "dummy-secret";

const app = require("../dist/app.js");

describe("Expressアプリのテスト", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /webhook (LINE Messaging API)", () => {
    test("テキストメッセージを送ると同じ内容が返る", async () => {
      const event = {
        type: "message",
        replyToken: "dummy-token",
        message: {
          type: "text",
          text: "こんにちは！",
        },
      };
      const response = await request(app)
        .post("/webhook")
        .send({ events: [event] })
        .expect(200);
      expect(response.body).toEqual({ status: "ok" });
    });

    test("テキスト以外のメッセージは返さない", async () => {
      const event = {
        type: "message",
        replyToken: "dummy-token",
        message: {
          type: "image",
          id: "img-id",
        },
      };
      const response = await request(app)
        .post("/webhook")
        .send({ events: [event] })
        .expect(200);
      expect(response.body).toEqual({ status: "ok" });
    });
  });

  describe("404ハンドラー", () => {
    test("存在しないルートは404を返す", async () => {
      const response = await request(app).get("/unknown-route").expect(404);

      expect(response.body).toEqual({ error: "Not Found" });
    });
  });
});
