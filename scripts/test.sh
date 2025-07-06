#!/bin/bash

# Flixo テスト実行スクリプト
# Usage: ./scripts/test.sh [option]

set -e

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ヘッダー表示
print_header() {
    echo -e "${PURPLE}"
    echo "🎬 ==============================================="
    echo "   Flixo - YouTube動画シェアサイト テストスイート"
    echo "===============================================${NC}"
    echo ""
}

# セクション表示
print_section() {
    echo -e "${CYAN}🔧 $1${NC}"
    echo ""
}

# 成功メッセージ
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# エラーメッセージ
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 警告メッセージ
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 情報メッセージ
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# 使用方法表示
show_usage() {
    echo -e "${YELLOW}Usage: ./scripts/test.sh [option]${NC}"
    echo ""
    echo "Options:"
    echo "  all       - 全テストを実行（デフォルト）"
    echo "  ui        - UIモードでテスト実行"
    echo "  headed    - ヘッドモードでテスト実行"
    echo "  debug     - デバッグモードでテスト実行"
    echo "  visual    - ビジュアルテストのみ実行"
    echo "  mobile    - モバイルテストのみ実行"
    echo "  desktop   - デスクトップテストのみ実行"
    echo "  install   - Playwrightブラウザのインストール"
    echo "  clean     - テスト結果をクリーンアップ"
    echo "  report    - HTMLレポートを開く"
    echo "  help      - このヘルプを表示"
}

# 前提条件チェック
check_prerequisites() {
    print_section "前提条件をチェック中..."
    
    # Node.jsのチェック
    if ! command -v node &> /dev/null; then
        print_error "Node.jsがインストールされていません"
        exit 1
    fi
    print_success "Node.js: $(node --version)"
    
    # npmのチェック
    if ! command -v npm &> /dev/null; then
        print_error "npmがインストールされていません"
        exit 1
    fi
    print_success "npm: $(npm --version)"
    
    # 依存関係のチェック
    if [ ! -d "node_modules" ]; then
        print_warning "依存関係がインストールされていません"
        print_info "npm install を実行中..."
        npm install
    fi
    print_success "依存関係: OK"
}

# Playwrightブラウザのインストール
install_browsers() {
    print_section "Playwrightブラウザをインストール中..."
    npx playwright install
    print_success "ブラウザのインストール完了"
}

# テスト結果ディレクトリの準備
prepare_test_dirs() {
    print_section "テストディレクトリを準備中..."
    
    # テスト結果ディレクトリの作成
    mkdir -p test-results
    mkdir -p playwright-report
    
    print_success "テストディレクトリの準備完了"
}

# テスト結果のクリーンアップ
clean_test_results() {
    print_section "テスト結果をクリーンアップ中..."
    
    rm -rf test-results/*
    rm -rf playwright-report/*
    
    print_success "クリーンアップ完了"
}

# 開発サーバーの起動チェック
check_dev_server() {
    print_section "開発サーバーをチェック中..."
    
    if curl -s http://localhost:3001 > /dev/null; then
        print_success "開発サーバーが起動中です"
        return 0
    else
        print_warning "開発サーバーが起動していません"
        print_info "npm run dev を別ターミナルで実行してください"
        return 1
    fi
}

# テスト実行関数
run_tests() {
    local mode=$1
    
    print_section "テストを実行中: $mode"
    
    case $mode in
        "all")
            npx playwright test
            ;;
        "ui")
            npx playwright test --ui
            ;;
        "headed")
            npx playwright test --headed
            ;;
        "debug")
            npx playwright test --debug
            ;;
        "visual")
            npx playwright test tests/visual-test.spec.ts
            ;;
        "mobile")
            npx playwright test --project="Mobile Chrome" --project="Mobile Safari"
            ;;
        "desktop")
            npx playwright test --project="chromium"
            ;;
        *)
            print_error "不明なテストモード: $mode"
            return 1
            ;;
    esac
}

# HTMLレポートを開く
open_report() {
    print_section "HTMLレポートを開いています..."
    
    if [ -f "playwright-report/index.html" ]; then
        if command -v open &> /dev/null; then
            open playwright-report/index.html
        elif command -v xdg-open &> /dev/null; then
            xdg-open playwright-report/index.html
        else
            print_info "ブラウザでファイルを開いてください: playwright-report/index.html"
        fi
        print_success "HTMLレポートを開きました"
    else
        print_error "HTMLレポートが見つかりません。先にテストを実行してください。"
    fi
}

# テスト結果のサマリー表示
show_summary() {
    print_section "テスト結果サマリー"
    
    if [ -f "test-results/results.json" ]; then
        print_info "詳細な結果は test-results/results.json をご確認ください"
    fi
    
    if [ -d "test-results" ]; then
        local screenshot_count=$(find test-results -name "*.png" | wc -l)
        print_info "生成されたスクリーンショット: ${screenshot_count}個"
    fi
    
    print_info "HTMLレポート: ./scripts/test.sh report で開けます"
}

# メイン処理
main() {
    print_header
    
    # 引数の処理
    local option=${1:-"all"}
    
    case $option in
        "help")
            show_usage
            exit 0
            ;;
        "clean")
            clean_test_results
            exit 0
            ;;
        "install")
            check_prerequisites
            install_browsers
            exit 0
            ;;
        "report")
            open_report
            exit 0
            ;;
    esac
    
    # 前提条件チェック
    check_prerequisites
    
    # テストディレクトリ準備
    prepare_test_dirs
    
    # 開発サーバーチェック（UIモード以外）
    if [ "$option" != "ui" ] && [ "$option" != "debug" ]; then
        if ! check_dev_server; then
            print_error "開発サーバーを起動してからテストを実行してください"
            print_info "コマンド: npm run dev"
            exit 1
        fi
    fi
    
    # テスト実行
    if run_tests "$option"; then
        print_success "テストが完了しました！"
        show_summary
    else
        print_error "テストが失敗しました"
        print_info "詳細は上記のログまたは HTML レポートをご確認ください"
        exit 1
    fi
}

# スクリプト実行
main "$@"