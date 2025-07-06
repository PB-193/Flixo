# 🚀 Flixo クイックテストデモ

このガイドでは、**5分で**Flixoのテストを体験できます！

## ⚡ 超高速テスト体験

### 1️⃣ ワンライナーテスト

```bash
# 🎯 これだけでOK！
./scripts/test.sh desktop
```

### 2️⃣ UIモードでテスト観察

```bash
# 🎮 インタラクティブにテスト観察
./scripts/test.sh ui
```

### 3️⃣ ブラウザを見ながらテスト

```bash
# 👀 ブラウザの動きを直接確認
./scripts/test.sh headed
```

## 📊 結果の確認

### 即座にレポート表示

```bash
# 📈 美しいHTMLレポートを開く
./scripts/test.sh report
```

### スクリーンショット確認

```bash
# 📸 生成されたスクリーンショットを確認
ls test-results/*.png
```

## 🎯 おすすめテストフロー

### 初回セットアップ（1分）

```bash
# Step 1: ブラウザインストール
./scripts/test.sh install

# Step 2: 開発サーバー起動（別ターミナル）
npm run dev
```

### 日常的なテスト（30秒）

```bash
# 🏃‍♂️ クイックテスト
npm run test:quick
```

### 詳細テスト（2分）

```bash
# 🔍 全機能テスト
./scripts/test.sh all
```

### デバッグテスト（対話的）

```bash
# 🐛 問題調査
./scripts/test.sh debug
```

## 🎨 生成されるファイル一覧

実行後、以下のファイルが自動生成されます：

```
📁 test-results/
├── 📸 main-page-full.png          # メインページ全体
├── 📸 desktop-1920x1080.png       # デスクトップ表示
├── 📸 mobile-375x667.png          # モバイル表示
├── 📸 video-post-form.png         # 投稿フォーム
├── 📸 card-hover-before.png       # ホバー前
├── 📸 card-hover-after.png        # ホバー後
└── 📄 results.json                # テスト結果JSON

📁 playwright-report/
└── 📊 index.html                  # 詳細HTMLレポート
```

## 🚨 トラブルシューティング（10秒で解決）

### 問題：開発サーバーエラー

```bash
# 解決：別ターミナルで
npm run dev
```

### 問題：ブラウザが見つからない

```bash
# 解決：ブラウザをインストール
./scripts/test.sh install
```

### 問題：テストが遅い

```bash
# 解決：軽量テストを実行
npm run test:quick
```

## 🎉 テスト成功の確認

### ✅ 成功パターン

```
✅ テストが完了しました！
📊 テスト結果サマリー
ℹ️  HTMLレポート: ./scripts/test.sh report で開けます
ℹ️  生成されたスクリーンショット: 15個
```

### 📊 レポートサンプル

成功時のレポートには以下が含まれます：

- **72テスト実行** ✅
- **68テスト成功** ✅  
- **94.4%成功率** ✅
- **15個のスクリーンショット** 📸
- **美しいHTMLレポート** 📊

## 🚀 次のステップ

### さらに詳しく学ぶ

- 📖 [完全テストガイド](TESTING.md)
- 📊 [テストレポート詳細](TEST_REPORT.md)
- 🛠️ [プロジェクト概要](README.md)

### カスタマイズ

- `playwright.config.ts` - テスト設定
- `tests/` - テストファイル追加
- `scripts/` - スクリプト改良

---

**🎬 5分でFlixoテストマスター完了！** ✨

次回からは `./scripts/test.sh` だけでOK！