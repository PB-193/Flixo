# 🎬 Flixo - 動画シェアサイト

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.1.0-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.6.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Playwright-1.53.2-45ba4b?style=for-the-badge&logo=playwright" alt="Playwright">
</div>

<br>

<div align="center">
  <p><strong>動画を美しくシェアする、次世代プラットフォーム</strong></p>
  <p>モダンなデザインと直感的なUIで、お気に入りの動画を簡単にシェア・発見できます。</p>
</div>

## ✨ 特徴

- 🎥 **YouTube 動画の簡単投稿** - URL をコピペするだけで瞬時に投稿
- 🔍 **プレビュー機能** - ホバー/長押しで動画をその場でプレビュー
- 📱 **完全レスポンシブ** - デスクトップからモバイルまで美しく表示
- ⚡ **高速パフォーマンス** - Next.js 15 による最適化されたパフォーマンス
- 🎨 **モダン UI/UX** - グラデーション、アニメーション、ガラスモーフィズム効果
- 🌙 **ダークモード対応** - ライト・ダークテーマ自動切り替え

## 🚀 デモ

### トップ表示

![Desktop View](test-results/desktop-1920x1080.png)

## 🛠️ 技術スタック

| カテゴリ              | 技術                              |
| --------------------- | --------------------------------- |
| **Frontend**          | Next.js 15 + TypeScript           |
| **スタイリング**      | Tailwind CSS + CSS Variables      |
| **UI コンポーネント** | Shadcn/ui (Radix UI ベース)       |
| **アイコン**          | Lucide React                      |
| **テスト**            | Playwright (E2E + Visual Testing) |
| **デプロイ**          | Vercel                            |
| **開発ツール**        | ESLint + TypeScript               |

## 📦 セットアップ

### 必要要件

- Node.js 18.0.0 以上
- npm または yarn

### インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd Flixo_PJ

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

### アクセス

開発サーバー起動後、以下の URL でアクセス可能です：

- **ローカル**: http://localhost:3000
- **ネットワーク**: http://192.168.3.68:3001

## 📱 使用方法

### 1. 動画を見る

- トップページで動画一覧を確認
- 動画カードをクリックでサイトに遷移
- カードにホバー（モバイルでは長押し）でプレビュー再生

### 2. 動画を投稿

1. 「動画を投稿」ボタンをクリック
2. URL を入力
3. タイトル、カテゴリー、説明を入力（タイトルのみ必須）
4. 「投稿する」ボタンで完了

### 3. レスポンシブ体験

- **デスクトップ**: 4 カラムグリッドで一覧表示
- **タブレット**: 3 カラムグリッドで最適化
- **モバイル**: 1 カラムで見やすく表示

## 🧪 テスト

### 📋 テスト実行方法

開発サーバーを起動してからテストを実行してください：

```bash
# 1. 開発サーバーを起動（別ターミナル）
npm run dev

# 2. テストを実行
npm test                    # 全テスト実行
npm run test:ui            # UIモードでテスト実行
npm run test:debug         # デバッグモードでテスト実行
```

### 🚀 簡単テスト実行（推奨）

専用のテストスクリプトを使用すると、より簡単にテストを実行できます：

```bash
# 基本的な使用方法
./scripts/test.sh [option]

# 使用例
./scripts/test.sh all      # 全テスト実行（デフォルト）
./scripts/test.sh ui       # UIモードでテスト実行
./scripts/test.sh visual   # ビジュアルテストのみ実行
./scripts/test.sh mobile   # モバイルテストのみ実行
./scripts/test.sh desktop  # デスクトップテストのみ実行
./scripts/test.sh report   # HTMLレポートを開く
./scripts/test.sh clean    # テスト結果をクリーンアップ
./scripts/test.sh help     # ヘルプ表示
```

### 🔧 初回セットアップ

初回のみ、Playwright ブラウザのインストールが必要です：

```bash
# Playwrightブラウザのインストール
npx playwright install

# または、テストスクリプトで
./scripts/test.sh install
```

### 📊 テスト結果の確認

テスト実行後、以下で結果を確認できます：

```bash
# HTMLレポートを開く
./scripts/test.sh report

# または手動で
open playwright-report/index.html  # macOS
xdg-open playwright-report/index.html  # Linux
```

### 🎯 テスト対象機能

| テストカテゴリ       | 対象機能                                     | ファイル                       |
| -------------------- | -------------------------------------------- | ------------------------------ |
| **メインページ**     | ページ読み込み、ヘッダー、背景グラデーション | `main-page.spec.ts`            |
| **動画グリッド**     | カード表示、ホバー効果、クリック動作         | `video-grid.spec.ts`           |
| **投稿機能**         | フォーム表示、バリデーション、送信処理       | `video-post.spec.ts`           |
| **レスポンシブ**     | 7 つのブレークポイント対応                   | `responsive-design.spec.ts`    |
| **ホバーエフェクト** | アニメーション、プレビュー機能               | `hover-effects.spec.ts`        |
| **画像エラー処理**   | SafeImage コンポーネント                     | `image-error-handling.spec.ts` |
| **ビジュアル回帰**   | スクリーンショット比較                       | `visual-test.spec.ts`          |

### 🛠️ 便利なテストオプション

```bash
# 特定のテストファイルのみ実行
npx playwright test tests/main-page.spec.ts

# 特定のブラウザでテスト
npx playwright test --project=chromium
npx playwright test --project="Mobile Chrome"

# ヘッドモードで実行（ブラウザ表示）
npx playwright test --headed

# 失敗したテストのみ再実行
npx playwright test --last-failed

# 並列実行数を指定
npx playwright test --workers=2
```

### 📈 継続的テスト

#### 開発中のテスト

```bash
# ファイル変更を監視してテスト実行
npx playwright test --watch
```

#### プッシュ前のテスト

```bash
# 包括的なテストセット
./scripts/test.sh all

# 型チェック + ビルドテスト + E2Eテスト
npm run type-check && npm run build && npm test
```

### 🚨 トラブルシューティング

| 問題                                                  | 解決方法                                          |
| ----------------------------------------------------- | ------------------------------------------------- |
| `Error: browserType.launch: Executable doesn't exist` | `npx playwright install` でブラウザをインストール |
| `Error: Timed out waiting for WebServer`              | 開発サーバーが起動していることを確認              |
| テストが失敗する                                      | `./scripts/test.sh clean` でキャッシュをクリア    |
| スナップショットが一致しない                          | `npx playwright test --update-snapshots` で更新   |

詳細なテスト結果は [TEST_REPORT.md](TEST_REPORT.md) をご確認ください。

## 🚀 デプロイ

### Vercel へのデプロイ

```bash
# Vercel CLIをインストール（初回のみ）
npm install -g vercel

# デプロイ実行
vercel

# 本番環境へデプロイ
vercel --prod
```

### ビルド

```bash
# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# コード品質チェック
npm run lint
```

## 📂 プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # メインページ
├── components/            # Reactコンポーネント
│   ├── ui/               # UI基盤コンポーネント
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   ├── VideoCard.tsx     # 動画カードコンポーネント
│   ├── VideoGrid.tsx     # 動画グリッドコンポーネント
│   ├── VideoPostForm.tsx # 投稿フォームコンポーネント
│   └── VideoPreview.tsx  # プレビューコンポーネント
├── lib/                  # ユーティリティ関数
│   ├── data.ts          # データ管理
│   └── utils.ts         # ヘルパー関数
└── types/                # TypeScript型定義
    └── video.ts         # Video型定義
```

## 🎨 デザインシステム

### カラーパレット

- **プライマリ**: Blue (#3B82F6) → Purple (#8B5CF6) → Pink (#EC4899)
- **背景**: グラデーション（Slate 50 → Slate 100）
- **カード**: 白色 + 透明度 + バックドロップブラー

### アニメーション

- **フェードイン**: 0.6 秒のイージングアニメーション
- **ホバーエフェクト**: スケール、シャドウ、画像拡大
- **トランジション**: 0.3 秒の滑らかな変化

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは ISC ライセンスの下で公開されています。

## 🔗 関連リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Playwright Testing](https://playwright.dev/)
- [Vercel Platform](https://vercel.com/)

---

<div align="center">
  <p>Made with ❤️ using Next.js and TypeScript</p>
  <p>🎬 <strong>Flixo</strong> - 動画を美しくシェアしよう</p>
</div>
