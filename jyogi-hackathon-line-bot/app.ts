import express from "express";
import {
  messagingApi,
  WebhookEvent,
  TextMessage,
  middleware,
} from "@line/bot-sdk";

export const lineClient = new messagingApi.MessagingApiClient({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
});

const app = express();

app.use(express.json());

app.post(
  "/webhook",
  middleware({
    channelSecret: process.env.LINE_CHANNEL_SECRET!,
  }),
  async (req, res) => {
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
  }
);

app.use((req: any, res: any, next: any) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports = app;
