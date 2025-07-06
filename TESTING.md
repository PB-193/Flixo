# 🧪 Flixo テストガイド

このガイドでは、Flixoプロジェクトのテストを簡単に実行する方法を説明します。

## 🚀 クイックスタート

### 1. 初回セットアップ

```bash
# 依存関係のインストール
npm install

# Playwrightブラウザのインストール
npm run test:install
# または
./scripts/test.sh install
```

### 2. 開発サーバーの起動

```bash
# 別ターミナルで開発サーバーを起動
npm run dev
```

### 3. テストの実行

```bash
# 🎯 最も簡単な方法
./scripts/test.sh

# または npmコマンドで
npm test
```

## 📋 利用可能なテストコマンド

### 🖥️ コマンドライン実行

| コマンド | 説明 |
|---------|------|
| `./scripts/test.sh` | 全テストを実行（推奨） |
| `./scripts/test.sh ui` | UIモードでテスト実行 |
| `./scripts/test.sh headed` | ブラウザを表示してテスト実行 |
| `./scripts/test.sh debug` | デバッグモードでテスト実行 |
| `./scripts/test.sh visual` | ビジュアルテストのみ実行 |
| `./scripts/test.sh mobile` | モバイルテストのみ実行 |
| `./scripts/test.sh desktop` | デスクトップテストのみ実行 |
| `./scripts/test.sh clean` | テスト結果をクリーンアップ |
| `./scripts/test.sh report` | HTMLレポートを開く |

### 📱 npm コマンド

| コマンド | 説明 |
|---------|------|
| `npm test` | 全テストを実行 |
| `npm run test:ui` | UIモードでテスト実行 |
| `npm run test:debug` | デバッグモードでテスト実行 |
| `npm run test:headed` | ブラウザを表示してテスト実行 |
| `npm run test:visual` | ビジュアルテストのみ実行 |
| `npm run test:mobile` | モバイルテストのみ実行 |
| `npm run test:desktop` | デスクトップテストのみ実行 |
| `npm run test:install` | Playwrightブラウザのインストール |
| `npm run test:report` | HTMLレポートを開く |
| `npm run test:clean` | テスト結果をクリーンアップ |
| `npm run test:quick` | クイックテスト（デスクトップのみ） |

## 🎯 テストの種類

### 📊 実装済みテスト

| テストファイル | 内容 |
|-------------|-----|
| `main-page.spec.ts` | メインページの表示・機能テスト |
| `video-grid.spec.ts` | 動画グリッドの表示・ホバー効果テスト |
| `video-post.spec.ts` | 動画投稿機能のテスト |
| `responsive-design.spec.ts` | レスポンシブデザインのテスト |
| `hover-effects.spec.ts` | ホバーエフェクト・アニメーションのテスト |
| `image-error-handling.spec.ts` | 画像エラーハンドリングのテスト |
| `visual-test.spec.ts` | ビジュアル回帰テスト |

### 🖼️ スクリーンショットテスト

テスト実行時に以下のスクリーンショットが自動生成されます：

- **メインページ**: フルページ・ビューポート
- **レスポンシブ**: 7つのブレークポイント
- **ホバー効果**: 前後の比較
- **フォーム**: 投稿フォームの状態
- **エラーハンドリング**: 画像エラー時の表示

## 📊 テスト結果の確認

### 1. HTMLレポート（推奨）

```bash
# テスト実行後にレポートを開く
./scripts/test.sh report
# または
npm run test:report
```

### 2. コンソール出力

テスト実行時にリアルタイムで結果が表示されます。

### 3. 生成ファイル

| ファイル/ディレクトリ | 内容 |
|------------------|-----|
| `playwright-report/` | 詳細HTMLレポート |
| `test-results/` | スクリーンショット・JSON結果 |
| `TEST_REPORT.md` | テスト概要レポート |

## 🔧 トラブルシューティング

### よくある問題と解決法

#### 🚨 開発サーバーが起動していない

```bash
Error: 開発サーバーを起動してからテストを実行してください
```

**解決法:**
```bash
# 別ターミナルで開発サーバーを起動
npm run dev
```

#### 🚨 Playwrightブラウザが見つからない

```bash
Error: Browser not found
```

**解決法:**
```bash
# ブラウザをインストール
npm run test:install
```

#### 🚨 テストが遅い・タイムアウトする

**解決法:**
```bash
# より軽量なテストを実行
npm run test:quick

# または特定のテストのみ実行
./scripts/test.sh desktop
```

#### 🚨 画像の404エラー

画像エラーは正常です。SafeImageコンポーネントが自動的にフォールバック処理を行います。

### デバッグ方法

#### 1. ブラウザを表示してテスト

```bash
./scripts/test.sh headed
```

#### 2. デバッグモード

```bash
./scripts/test.sh debug
```

#### 3. 特定のテストファイルのみ実行

```bash
npx playwright test tests/main-page.spec.ts
```

## 🎨 カスタマイズ

### テスト設定の変更

`playwright.config.ts` でテスト設定をカスタマイズできます：

```typescript
// タイムアウト時間の変更
timeout: 30000,

// リトライ回数の変更
retries: 2,

// 並列実行数の変更
workers: 2,
```

### 新しいテストの追加

```typescript
// tests/new-feature.spec.ts
import { test, expect } from '@playwright/test';

test('新機能のテスト', async ({ page }) => {
  await page.goto('/');
  // テストコードを追加
});
```

## 🚀 CI/CD での実行

### GitHub Actions

```yaml
# .github/workflows/test.yml
- name: Run tests
  run: |
    npm ci
    npx playwright install
    npm run build
    npm start &
    ./scripts/test.sh all
```

### その他のCI

```bash
# CIでのテスト実行
npm ci
npm run test:install
npm run build
npm start &
sleep 5
npm test
```

## 📈 パフォーマンス最適化

### 高速テスト実行

```bash
# デスクトップのみ（最高速）
npm run test:quick

# 並列実行数を増やす
npx playwright test --workers=4

# リトライを無効化
npx playwright test --retries=0
```

## 🔗 関連リンク

- [Playwright 公式ドキュメント](https://playwright.dev/)
- [テストレポート例](playwright-report/index.html)
- [Flixo プロジェクト README](README.md)

---

**🎬 Happy Testing with Flixo! ✨**