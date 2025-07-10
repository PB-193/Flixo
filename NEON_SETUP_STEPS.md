# Neon PostgreSQL セットアップ手順

## 1. Neonアカウント作成
1. [Neon.tech](https://neon.tech/)にアクセス
2. 「Get Started」→「Sign Up」をクリック
3. GitHubアカウントでサインアップ（推奨）

## 2. プロジェクト作成
1. ダッシュボードで「Create Project」
2. プロジェクト名: `flixo-db`
3. Region: `US East (N. Virginia)` (Vercelとの相性が良い)
4. PostgreSQLバージョン: `16` (最新)

## 3. 接続文字列の取得
1. プロジェクト作成後、「Connection Details」を確認
2. DATABASE_URLをコピー
   ```
   postgresql://[user]:[password]@[endpoint]/[dbname]?sslmode=require
   ```

## 4. 環境変数の更新

### ローカル環境 (.env)
```bash
# 現在のローカルPrisma Postgresを置き換え
DATABASE_URL="postgresql://[user]:[password]@[endpoint]/[dbname]?sslmode=require"
```

### Vercel環境変数
1. Vercelダッシュボードでプロジェクトを選択
2. Settings → Environment Variables
3. `DATABASE_URL`を追加

## 5. データベースマイグレーション実行

### ローカルでセットアップ
```bash
# Prismaクライアント生成
npm run db:generate

# データベースにスキーマをプッシュ
npx prisma db push

# 初期マイグレーション作成
npm run db:migrate

# Prisma Studioでデータベース確認
npm run db:studio
```

### 本番デプロイ
```bash
# 本番データベースにマイグレーション適用
npm run db:deploy
```

## 6. CI/CDパイプライン更新

GitHub Actionsワークフローにマイグレーション追加:

```yaml
# .github/workflows/deploy.yml に追加
- name: Run database migration
  run: npm run db:deploy
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

## 7. 接続テスト

### テスト用APIルート作成
```bash
# 新しいターミナルで
curl http://localhost:3001/api/videos
```

または、ブラウザで動画投稿をテストして、リロード後もデータが残ることを確認

## トラブルシューティング

### よくある問題
1. **接続エラー**: DATABASE_URLの形式を確認
2. **SSL エラー**: URLに`?sslmode=require`が含まれているか確認
3. **タイムアウト**: Neonの無料プランの制限を確認

### デバッグ方法
```bash
# 接続テスト
npx prisma db push --preview-feature

# データベース状態確認
npx prisma studio
```

## 無料プランの制限（2025年）
- ストレージ: 512MB
- CPU: 0.25vCPU
- RAM: 1GB
- ブランチ: 10個まで
- プロジェクト: 1個

個人開発・小規模アプリには十分です！