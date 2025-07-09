# Flixo デプロイメントガイド

## CI/CDパイプライン

このプロジェクトでは、GitHub ActionsとVercelを使用した自動デプロイメントを実装しています。

### ワークフロー

1. **developブランチ**: 開発とテスト
2. **mainブランチ**: 本番デプロイ用

### デプロイフロー

```
develop → PR → main → 自動デプロイ
```

## セットアップ

### 1. Vercelプロジェクトの作成

1. [Vercel Dashboard](https://vercel.com/dashboard)でプロジェクトを作成
2. GitHubリポジトリをインポート
3. プロジェクトIDとOrgIDを取得

### 2. GitHub Secretsの設定

以下のシークレットをGitHubリポジトリに追加：

```
VERCEL_TOKEN=<your-vercel-token>
VERCEL_ORG_ID=<your-org-id>
VERCEL_PROJECT_ID=<your-project-id>
```

### 3. Vercelトークンの取得

1. [Vercel Settings](https://vercel.com/account/tokens)でトークンを生成
2. `VERCEL_TOKEN`として設定

### 4. プロジェクトIDの取得

```bash
# Vercel CLIでプロジェクト情報を取得
vercel link
cat .vercel/project.json
```

## デプロイプロセス

### 自動デプロイ

mainブランチにプッシュまたはマージすると自動的に：

1. **テスト実行**
   - TypeScriptの型チェック
   - ビルドテスト
   - Playwrightテスト

2. **デプロイ実行**
   - Vercelへの自動デプロイ
   - 本番環境への反映

### 手動デプロイ

```bash
# Vercel CLIを使用
npm install -g vercel
vercel --prod
```

## 環境設定

### 開発環境
- サンプルデータあり
- ローカルサーバー (localhost:3001)

### 本番環境
- 空のデータからスタート
- Vercelでホスティング

## テスト

デプロイ前に以下のテストが実行されます：

- 型チェック (`npm run type-check`)
- ビルドテスト (`npm run build`)
- E2Eテスト (`npm run test`)

## トラブルシューティング

### デプロイが失敗する場合

1. GitHub Actionsのログを確認
2. Vercelのデプロイログを確認
3. 環境変数の設定を確認

### テストが失敗する場合

1. ローカルでテストを実行
2. スナップショットの更新が必要な場合は更新
3. 依存関係の問題を確認

## 監視とメンテナンス

- デプロイ状況はGitHub Actionsで監視
- Vercelダッシュボードでパフォーマンスを確認
- 定期的なテスト実行でプロジェクトの健全性を確認