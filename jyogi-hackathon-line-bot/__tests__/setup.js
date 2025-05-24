// AWS SDKをモック化
const mockDocClient = {
  send: jest.fn(),
};

jest.doMock("@aws-sdk/client-dynamodb", () => ({
  DynamoDBClient: jest.fn(() => {}),
}));

jest.doMock("@aws-sdk/lib-dynamodb", () => ({
  DynamoDBDocumentClient: {
    from: jest.fn(() => mockDocClient),
  },
  GetCommand: jest.fn(),
  PutCommand: jest.fn(),
}));

jest.doMock("@line/bot-sdk", () => ({
  messagingApi: {
    MessagingApiClient: jest.fn(() => {
      return {
        replyMessage: jest.fn().mockResolvedValue(undefined),
      };
    }),
  },
  middleware: jest.fn(() => (req, res, next) => next()),
}));

module.exports = {
  mockDocClient,
};
