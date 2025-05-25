# Jyogi Hackathon プロジェクト構成

このプロジェクトは、LINE Bot のバックエンド、画像レンダリング用の React アプリケーション、Unity/Flutter ベースの画像レンダラーを含むハッカソンプロジェクトです。

## 🏗️ プロジェクト概要

プロジェクトは 4 つの主要なコンポーネントで構成されています：

1. **LINE Bot API (Serverless)** - AWS Lambda + DynamoDB を使用したサーバーレスバックエンド
2. **React Image Renderer** - Next.js ベースのフロントエンドアプリケーション
3. **Unity Image Renderer** - Unity ベースの画像レンダリングサブプロジェクト
4. **Flutter Image Renderer** - Flutter ベースの画像レンダリングサブプロジェクト

## 📁 ディレクトリ構成

```
jyogi-hackathon/
├── .github/workflows/           # GitHub Actions CI/CD設定
│   ├── serverless-deploy.yaml   # LINE Bot自動デプロイ
│   └── cicd.yaml               # React App自動デプロイ
├── jyogi-hackathon-line-bot/   # LINE Botバックエンド
├── react-image-renderer/       # React フロントエンド
├── unity-image-renderer/       # Unity 画像レンダラー
└── flutter_image_renderer/     # Flutter 画像レンダラー
```

## 🤖 LINE Bot バックエンド (`jyogi-hackathon-line-bot/`)

### 技術スタック

- **ランタイム**: Node.js 22.15.1
- **フレームワーク**: Serverless Framework
- **インフラ**: AWS Lambda + DynamoDB
- **ライブラリ**: Express.js + AWS SDK v3

### 主要ファイル

- `handler.js` - Lambda 関数のメインハンドラー（Express.js アプリ）
- `serverless.yml` - Serverless Framework 設定
- `package.json` - Node.js 依存関係

### AWS リソース

- **Lambda 関数**: HTTP API エンドポイント
- **DynamoDB**: ユーザーデータストレージ（`users-table-{stage}`）
- **IAM**: DynamoDB 操作権限

### API エンドポイント

- `GET /users/:userId` - ユーザー情報取得
- `POST /users` - ユーザー作成/更新

### デプロイメント

- **自動デプロイ**: `main`ブランチへの push 時（`jyogi-hackathon-line-bot/**`パス変更時）
- **プロバイダー**: AWS (ap-northeast-1 リージョン)
- **認証**: IAM ロール + OpenID Connect

## ⚛️ React Image Renderer (`react-image-renderer/`)

### 技術スタック

- **ランタイム**: Node.js 22.15.1
- **フレームワーク**: Next.js 15.1.8 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **テスト**: Jest + Testing Library

### 開発ツール

- **リンター**: ESLint (Next.js 設定)
- **テストランナー**: Jest with jsdom 環境
- **開発サーバー**: Turbopack

### 主要ファイル

- `src/app/page.tsx` - メインページコンポーネント
- `src/app/layout.tsx` - アプリケーションレイアウト
- `tailwind.config.ts` - Tailwind CSS 設定
- `next.config.ts` - Next.js 設定

### デプロイメント

- **自動デプロイ**: `main`ブランチへの push 時（`react-image-renderer/**`パス変更時）
- **プロバイダー**: Vercel
- **CI/CD**: テスト → リント → ビルド → デプロイ

## 🎮 Unity Image Renderer (`unity-image-renderer/`)

### 技術スタック

- **エンジン**: Unity
- **用途**: 画像レンダリング、2D/3D アセット処理
- **主要ファイル**: Unity プロジェクト標準構成（`*.csproj`, `Assets/`, `*.sln` など）

## 📱 Flutter Image Renderer (`flutter_image_renderer/`)

### 技術スタック

- **フレームワーク**: Flutter
- **用途**: クロスプラットフォーム画像レンダリング
- **主要ファイル**: `pubspec.yaml`, `lib/`, `test/` など

## 🚀 CI/CD パイプライン

### LINE Bot デプロイ (`serverless-deploy.yaml`)

```yaml
トリガー: jyogi-hackathon-line-bot/** への変更
ステップ:
1. Node.js 22.15.1 セットアップ
2. 依存関係インストール
3. Serverless Framework インストール
4. AWS認証設定
5. 本番環境にデプロイ
```

### React App デプロイ (`cicd.yaml`)

```yaml
トリガー: react-image-renderer/** への変更
ステップ:
1. Node.js 22.15.1 セットアップ
2. 依存関係インストール
3. テスト実行
4. コード品質チェック (ESLint)
5. プロダクションビルド
6. Vercelにデプロイ
```

## 🔧 開発環境セットアップ

### 前提条件

- Node.js 22.15.1
- npm
- AWS CLI (LINE Bot 開発時)
- Serverless Framework CLI
- Unity Hub + Unity Editor（Unity 開発時）
- Flutter SDK（Flutter 開発時）

### LINE Bot 開発

```bash
cd jyogi-hackathon-line-bot
npm install
# AWS認証情報設定
serverless deploy --stage dev
```

### React App 開発

```bash
cd react-image-renderer
npm install
npm run dev          # 開発サーバー起動
npm run test         # テスト実行
npm run lint         # リント実行
npm run build        # プロダクションビルド
```

### Unity Image Renderer 開発

- Unity Hub でプロジェクトを開き、Unity Editor で編集・ビルド

### Flutter Image Renderer 開発

```bash
cd flutter_image_renderer
flutter pub get
flutter run           # 開発サーバー起動
flutter test          # テスト実行
```

## 🌟 特徴

- **モノレポ構成**: 関連する複数のサービスを一つのリポジトリで管理
- **自動化**: パス指定による個別デプロイメント
- **スケーラブル**: サーバーレスアーキテクチャによる自動スケーリング
- **モダンスタック**: 最新のフレームワークとツールチェーン
- **品質保証**: 自動テスト + リンティング
- **マルチプラットフォーム**: Web/モバイル/ゲームエンジン対応

## 📝 開発時の注意事項

1. **Node.js バージョン**: 両プロジェクトで 22.15.1 を使用
2. **デプロイトリガー**: 各サービスのディレクトリ内の変更のみが対応するデプロイをトリガー
3. **環境変数**: 各デプロイメントに必要なシークレットが GitHub Secrets に設定済み
4. **リージョン**: AWS リソースは ap-northeast-1 (東京) リージョンにデプロイ
5. **Unity/Flutter**: 各公式推奨バージョンを利用

このプロジェクト構成により、LINE Bot のバックエンド、フロントエンドアプリケーション、Unity/Flutter 画像レンダラーを効率的に開発・デプロイできます。
