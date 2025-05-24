import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import express from "express";
import {
  messagingApi,
  WebhookEvent,
  TextMessage,
  middleware,
} from "@line/bot-sdk";

const app = express();

const USERS_TABLE = process.env.USERS_TABLE!;
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const config = {
  channelSecret: process.env.LINE_CHANNEL_SECRET!,
};

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
};
export const lineClient = new messagingApi.MessagingApiClient(lineConfig);

app.use(express.json());

app.get("/users/:userId", async (req, res) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);
    if (Item) {
      const { userId, name } = Item;
      res.json({ userId, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find user with provided "userId"' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not retrieve user" });
  }
});

// 型アサーションでanyを利用してExpressの型エラーを回避
(app as any).post("/users", async (req: any, res: any) => {
  const { userId, name } = req.body;
  if (typeof userId !== "string") {
    return res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== "string") {
    return res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: { userId, name },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.json({ userId, name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create user" });
  }
});

// LINE Messaging APIのエコーエンドポイント
app.post("/webhook", middleware(config), async (req, res) => {
  const events: WebhookEvent[] = req.body.events || [];
  await Promise.all(
    events.map(async (event) => {
      if (
        event.type === "message" &&
        event.message &&
        event.message.type === "text"
      ) {
        // 受け取ったテキストをそのまま返す
        try {
          await lineClient.replyMessage({
            replyToken: event.replyToken,
            messages: [
              {
                type: "text",
                text: event.message.text,
              } as TextMessage,
            ],
          });
        } catch (err) {
          console.error("LINE reply error", err);
        }
      }
    })
  );
  res.json({ status: "ok" });
});

// 型アサーションでanyを利用してExpressの型エラーを回避
(app as any).use((req: any, res: any, next: any) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports = app;
