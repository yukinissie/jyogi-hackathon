# jyogi-hackathon-line-bot

DynamoDB を使用した Express.js アプリケーションのテスト環境。

## セットアップ

### 必要な依存関係をインストール

```bash
npm install
```

## テスト

### テスト実行

```bash
# 基本的なテスト実行
npm test

# ウォッチモードでテスト実行
npm run test:watch

# カバレッジレポート付きでテスト実行
npm run test:coverage
```

## プロジェクト構造

```
├── app.js                 # メインのExpressアプリケーション
├── handler.js             # Serverless Lambda ハンドラー
├── package.json           # プロジェクト設定と依存関係
├── jest.config.js         # Jest設定ファイル
├── __tests__/
│   ├── setup.js          # テスト用のモック設定
│   └── handler.test.js   # メインテストファイル
└── README.md             # このファイル
```

## API エンドポイント

### GET /users/:userId

指定されたユーザー ID のユーザー情報を取得します。

**レスポンス例:**

```json
{
  "userId": "test-id",
  "name": "Test User"
}
```

### POST /users

新しいユーザーを作成します。

**リクエスト例:**

```json
{
  "userId": "new-id",
  "name": "New User"
}
```

## テスト情報

このプロジェクトでは以下のテストライブラリを使用しています：

- **Jest**: テストフレームワーク
- **Supertest**: HTTP アサーションライブラリ
- **AWS SDK Mocking**: DynamoDB クライアントのモック化

### モック戦略

AWS DynamoDB クライアントは完全にモック化されており、実際の AWS サービスに接続することなくテストを実行できます。

### カバレッジ

現在のテストカバレッジ：

- **app.js**: 100% (全ての機能がテストされています)
- **全体**: 92.1% (handler.js は serverless ラッパーのため除外)

## 開発

新しいエンドポイントを追加する場合：

1. `app.js`にエンドポイントを追加
2. `__tests__/handler.test.js`に対応するテストを追加
3. テストを実行して機能を確認

```bash
npm test
```

# Serverless Framework Node Express API on AWS

This template demonstrates how to develop and deploy a simple Node Express API service, backed by DynamoDB table, running on AWS Lambda using the Serverless Framework.

This template configures a single function, `api`, which is responsible for handling all incoming requests using the `httpApi` event. To learn more about `httpApi` event configuration options, please refer to [httpApi event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/). As the event is configured in a way to accept all incoming requests, the Express.js framework is responsible for routing and handling requests internally. This implementation uses the `serverless-http` package to transform the incoming event request payloads to payloads compatible with Express.js. To learn more about `serverless-http`, please refer to the [serverless-http README](https://github.com/dougmoscrop/serverless-http).

Additionally, it also handles provisioning of a DynamoDB database that is used for storing data about users. The Express.js application exposes two endpoints, `POST /users` and `GET /user/:userId`, which create and retrieve a user record.

## Usage

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
serverless deploy
```

After running deploy, you should see output similar to:

```
Deploying "aws-node-express-dynamodb-api" to stage "dev" (us-east-1)

✔ Service deployed to stack aws-node-express-dynamodb-api-dev (109s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: aws-node-express-dynamodb-api-dev-api (3.8 MB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [`httpApi` event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/). Additionally, in current configuration, the DynamoDB table will be removed when running `serverless remove`. To retain the DynamoDB table even after removal of the stack, add `DeletionPolicy: Retain` to its resource definition.

### Invocation

After successful deployment, you can create a new user by calling the corresponding endpoint:

```
curl --request POST 'https://xxxxxx.execute-api.us-east-1.amazonaws.com/users' --header 'Content-Type: application/json' --data-raw '{"name": "John", "userId": "someUserId"}'
```

Which should result in the following response:

```json
{ "userId": "someUserId", "name": "John" }
```

You can later retrieve the user by `userId` by calling the following endpoint:

```
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/users/someUserId
```

Which should result in the following response:

```json
{ "userId": "someUserId", "name": "John" }
```

### Local development

The easiest way to develop and test your function is to use the `dev` command:

```
serverless dev
```

This will start a local emulator of AWS Lambda and tunnel your requests to and from AWS Lambda, allowing you to interact with your function as if it were running in the cloud.

Now you can invoke the function as before, but this time the function will be executed locally. Now you can develop your function locally, invoke it, and see the results immediately without having to re-deploy.

When you are done developing, don't forget to run `serverless deploy` to deploy the function to the cloud.
