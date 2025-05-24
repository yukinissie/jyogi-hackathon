// AWS SDKをモック化
const mockDocClient = {
  send: jest.fn(),
};

const mockClient = {};

jest.doMock("@aws-sdk/client-dynamodb", () => ({
  DynamoDBClient: jest.fn(() => mockClient),
}));

jest.doMock("@aws-sdk/lib-dynamodb", () => ({
  DynamoDBDocumentClient: {
    from: jest.fn(() => mockDocClient),
  },
  GetCommand: jest.fn(),
  PutCommand: jest.fn(),
}));

// モックオブジェクトをエクスポート
module.exports = {
  mockDocClient,
  mockClient,
};
