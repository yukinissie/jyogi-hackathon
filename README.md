# Jyogi Hackathon

このリポジトリは、LINE Bot バックエンド、React/Next.js フロントエンド、Unity/Flutter 画像レンダラーを含むマルチプラットフォーム対応のハッカソンプロジェクトです。

---

> **注意**: この README は AI (GitHub Copilot) によって自動生成・編集されています。内容の正確性や最新性についてはご自身でもご確認ください。なお、生身の人間が書いたプロジェクト詳細は「プログラマーが開発したものを最も簡単に、わかりやすく公開することができるサービス」の [Topa'z に記載しています](https://topaz.dev/projects/c004e4e2364b3f62a262) のでぜひそちらをご覧ください。

---

## 🏗️ プロジェクト概要

- **LINE Bot API (Serverless)**: AWS Lambda + DynamoDB を用いたサーバーレスなバックエンド
- **React Image Renderer**: Next.js (TypeScript, Tailwind CSS) ベースの Web フロントエンド
- **Unity Image Renderer**: Unity エンジンによる画像レンダリングサブプロジェクト
- **Flutter Image Renderer**: Flutter によるクロスプラットフォーム画像レンダラー

## 📁 ディレクトリ構成

```
jyogi-hackathon/
├── .github/workflows/           # GitHub Actions CI/CD 設定
│   ├── serverless-deploy.yaml   # LINE Bot 自動デプロイ
│   └── cicd.yaml               # React App 自動デプロイ
├── jyogi-hackathon-line-bot/   # LINE Bot バックエンド
├── react-image-renderer/       # React フロントエンド
├── unity-image-renderer/       # Unity 画像レンダラー
└── flutter_image_renderer/     # Flutter 画像レンダラー
```

## 🚀 開発環境セットアップ

### 共通前提

- Node.js 22.15.1
- npm
- AWS CLI (LINE Bot 開発時)
- Serverless Framework CLI
- Unity Hub + Unity Editor（Unity 開発時）
- Flutter SDK（Flutter 開発時）

### LINE Bot バックエンド

```bash
cd jyogi-hackathon-line-bot
npm install
# AWS認証情報設定
serverless deploy --stage dev
```

### React フロントエンド

```bash
cd react-image-renderer
npm install
npm run dev          # 開発サーバー起動
npm run test         # テスト実行
npm run lint         # リント実行
npm run build        # プロダクションビルド
```

### Unity 画像レンダラー

- Unity Hub でプロジェクトを開き、Unity Editor で編集・ビルド

### Flutter 画像レンダラー

```bash
cd flutter_image_renderer
flutter pub get
flutter run           # 開発サーバー起動
flutter test          # テスト実行
```

## 🛠️ 技術スタック

- **バックエンド**: Node.js, Serverless Framework, AWS Lambda, DynamoDB, Express.js, AWS SDK v3
- **フロントエンド**: Next.js 15, TypeScript, Tailwind CSS, Jest, ESLint
- **Unity**: Unity 標準構成
- **Flutter**: Flutter 標準構成

## 🌟 特徴

- モノレポ構成で複数サービスを一元管理
- サーバーレスアーキテクチャによるスケーラビリティ
- CI/CD による自動テスト・自動デプロイ
- Web/モバイル/ゲームエンジン対応のマルチプラットフォーム

## 📝 注意事項

- Node.js バージョンは 22.15.1 を使用
- 各サービスのディレクトリ変更のみが対応するデプロイをトリガー
- AWS リージョンは ap-northeast-1 (東京)
- 各種シークレットは GitHub Secrets で管理
- Unity/Flutter は公式推奨バージョンを利用

---

本プロジェクトは、LINE Bot バックエンド、Web/モバイル/ゲーム向け画像レンダラーを効率的に開発・デプロイするための最新モノレポです。
