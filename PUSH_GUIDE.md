# 🚀 Flixo プッシュガイド

このガイドでは、Flixoプロジェクトでの**自動テスト付きプッシュ**の使用方法を説明します。

## 🎯 概要

Flixoプロジェクトでは、プッシュ前に自動的にテストを実行し、エラーがある場合はプッシュをブロックする仕組みを導入しています。

## 🔧 設定済みの自動化

### 1. Pre-Push Hook
- **自動実行**: `git push` 実行時に自動でテストが走ります
- **エラー時**: テスト失敗時はプッシュをキャンセル
- **サーバー起動**: 開発サーバーが起動していない場合は自動で起動

### 2. 自動テスト&プッシュスクリプト
より快適な操作のための専用スクリプトも用意されています。

## 📋 使用方法

### 方法1: 標準のgitコマンド（推奨）

```bash
# 通常のプッシュ（自動でテストが実行されます）
git push

# 特定のブランチにプッシュ
git push origin develop
```

### 方法2: npmコマンド

```bash
# 現在のブランチにプッシュ
npm run push

# developブランチにプッシュ
npm run push:develop

# mainブランチにプッシュ
npm run push:main
```

### 方法3: 直接スクリプト実行

```bash
# 現在のブランチにプッシュ
./scripts/auto-test-push.sh

# 特定のブランチにプッシュ
./scripts/auto-test-push.sh develop
./scripts/auto-test-push.sh feature/new-ui

# ヘルプ表示
./scripts/auto-test-push.sh --help
```

## 🔄 自動実行される処理

プッシュ時に以下の処理が自動実行されます：

1. **Git状態チェック**
   - 未コミットの変更がないか確認
   - 作業ディレクトリがクリーンか確認

2. **開発サーバー確認**
   - `localhost:3000` または `localhost:3001` で起動中か確認
   - 起動していない場合は自動で `npm run dev` を実行

3. **テスト実行**
   - `./scripts/test.sh desktop` でデスクトップテストを実行
   - 全テストが成功するまでプッシュをブロック

4. **プッシュ実行**
   - テスト成功時のみプッシュを実行
   - 自動起動した開発サーバーは停止

## ❌ エラー時の対処法

### テスト失敗時

```bash
❌ テストが失敗しました
⚠️  プッシュをキャンセルします

修正方法:
1. ./scripts/test.sh でテストを再実行
2. エラーを修正
3. 変更をコミット
4. 再度プッシュを実行
```

**対処手順:**

```bash
# 1. テストを再実行してエラーを確認
./scripts/test.sh

# 2. エラーを修正（コード修正）

# 3. 修正をコミット
git add .
git commit -m "fix: テストエラーを修正"

# 4. 再度プッシュ
git push
```

### 開発サーバー起動失敗時

```bash
❌ 開発サーバーの起動に失敗しました
ℹ️  手動で 'npm run dev' を実行してからプッシュしてください
```

**対処手順:**

```bash
# 別ターミナルで開発サーバーを起動
npm run dev

# プッシュを再実行
git push
```

## 🎨 カスタマイズ

### テスト内容の変更

テスト内容を変更したい場合は以下のファイルを編集：

- `.git/hooks/pre-push` - Pre-pushフックの設定
- `scripts/auto-test-push.sh` - 自動テスト&プッシュスクリプト
- `scripts/test.sh` - テストスクリプト本体

### フックの無効化

一時的にテストをスキップしたい場合：

```bash
# Pre-pushフックをスキップ
git push --no-verify

# ただし、本来はテストを修正してからプッシュすることを推奨
```

## 📊 テスト結果の確認

### ローカルでの結果

```bash
# HTMLレポートを開く
./scripts/test.sh report

# または
npm run test:report
```

### CI/CDでの結果

プッシュ後、GitHub Actionsで自動的にテストが実行されます：

- リポジトリの「Actions」タブで結果を確認
- PRでもテストが自動実行されます

## 🚀 ベストプラクティス

### 1. 定期的なテスト実行

```bash
# 開発中も定期的にテストを実行
npm run test:quick
```

### 2. コミット前のチェック

```bash
# コミット前にクイックテスト
./scripts/test.sh desktop
```

### 3. プッシュ前の確認

```bash
# Git状態を確認
git status

# ローカルでテスト実行
npm test

# プッシュ実行
npm run push
```

## 🔗 関連リンク

- [テストガイド](TESTING.md) - 詳細なテスト手順
- [クイックデモ](QUICK_TEST_DEMO.md) - テストのクイックスタート
- [プロジェクト概要](README.md) - プロジェクト全体の説明

---

**🎬 Happy Coding with Flixo! ✨**

これで、品質の高いコードを確実にリモートにプッシュできます！