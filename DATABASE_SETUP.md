# データベースセットアップガイド

## Neon (PostgreSQL) セットアップ

### 1. Neonアカウント作成
1. [Neon](https://neon.tech/)でアカウント作成
2. 新しいプロジェクトを作成
3. データベース名: `flixo-db`

### 2. 接続文字列の取得
1. Neonダッシュボードで「Connection Details」を確認
2. DATABASE_URLをコピー

### 3. 環境変数設定

#### ローカル開発 (.env)
```
# ローカルはPrisma Postgresを使用
DATABASE_URL="prisma+postgres://..."
```

#### 本番環境 (Vercel)
```
# NeonのPostgreSQLを使用
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/flixo-db?sslmode=require"
```

### 4. Vercel環境変数設定
1. Vercelダッシュボードでプロジェクトを選択
2. Settings → Environment Variables
3. `DATABASE_URL`を追加（NeonのURL）

### 5. データベースマイグレーション

#### ローカル
```bash
# Prismaクライアント生成
npx prisma generate

# マイグレーション実行
npx prisma migrate dev --name init

# データベース確認
npx prisma studio
```

#### 本番
```bash
# 本番データベースにマイグレーション
npx prisma migrate deploy
```

### 6. package.jsonスクリプト追加
```json
{
  "scripts": {
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:deploy": "prisma migrate deploy",
    "db:studio": "prisma studio",
    "db:reset": "prisma migrate reset"
  }
}
```

## 無料プランの制限
- **Neon Free**: 512MB ストレージ, 1プロジェクト
- 小～中規模アプリケーションに最適

## セキュリティ注意点
- DATABASE_URLは絶対に公開リポジトリにコミットしない
- .envファイルは.gitignoreに含まれていることを確認
- 本番環境ではSSL接続を必須にする