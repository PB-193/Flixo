#!/bin/bash

# Flixo 自動テスト&プッシュスクリプト
# 使用法: ./scripts/auto-test-push.sh [branch-name]

set -e

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

print_header() {
    echo -e "${PURPLE}"
    echo "🚀 =============================================="
    echo "   Flixo 自動テスト&プッシュ"
    echo "=============================================="
    echo -e "${NC}"
}

print_section() {
    echo -e "${CYAN}🔧 $1${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# 使用方法の表示
show_usage() {
    echo "使用方法:"
    echo "  ./scripts/auto-test-push.sh [branch-name]"
    echo ""
    echo "例:"
    echo "  ./scripts/auto-test-push.sh              # 現在のブランチにプッシュ"
    echo "  ./scripts/auto-test-push.sh develop      # developブランチにプッシュ"
    echo "  ./scripts/auto-test-push.sh feature/ui   # feature/uiブランチにプッシュ"
}

# 開発サーバーのチェック
check_dev_server() {
    if curl -f http://localhost:3000 >/dev/null 2>&1; then
        return 0
    elif curl -f http://localhost:3001 >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# メイン処理
main() {
    local target_branch="$1"
    local current_branch=$(git branch --show-current)
    
    print_header
    
    # 引数チェック
    if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
        show_usage
        exit 0
    fi
    
    # ターゲットブランチの決定
    if [ -z "$target_branch" ]; then
        target_branch="$current_branch"
        print_info "現在のブランチ '$current_branch' にプッシュします"
    else
        print_info "ブランチ '$target_branch' にプッシュします"
    fi
    
    echo ""
    
    # 1. Git状態のチェック
    print_section "Git状態をチェック中..."
    
    if [ -n "$(git status --porcelain)" ]; then
        print_warning "未コミットの変更があります"
        print_info "変更をコミットしてからプッシュしてください"
        echo ""
        git status --short
        exit 1
    fi
    
    print_success "Git作業ディレクトリはクリーンです"
    echo ""
    
    # 2. 開発サーバーのチェックと起動
    print_section "開発サーバーをチェック中..."
    
    local dev_server_started=false
    
    if check_dev_server; then
        print_success "開発サーバーが起動中です"
    else
        print_info "開発サーバーを起動中..."
        
        # バックグラウンドで開発サーバーを起動
        npm run dev > /dev/null 2>&1 &
        DEV_SERVER_PID=$!
        dev_server_started=true
        
        # サーバーの起動を待つ
        echo -n "サーバー起動待機中"
        for i in {1..30}; do
            if check_dev_server; then
                echo ""
                print_success "開発サーバーが起動しました"
                break
            fi
            echo -n "."
            sleep 1
        done
        
        # 30秒経っても起動しない場合はエラー
        if ! check_dev_server; then
            echo ""
            print_error "開発サーバーの起動に失敗しました"
            exit 1
        fi
    fi
    
    echo ""
    
    # 3. テスト実行
    print_section "テストを実行中..."
    
    if ./scripts/test.sh desktop; then
        echo ""
        print_success "全てのテストが成功しました！"
    else
        echo ""
        print_error "テストが失敗しました"
        
        # 自動起動した開発サーバーを停止
        if [ "$dev_server_started" = true ] && [ ! -z "$DEV_SERVER_PID" ]; then
            print_info "開発サーバーを停止中..."
            kill $DEV_SERVER_PID 2>/dev/null || true
        fi
        
        print_warning "テストエラーを修正してから再実行してください"
        exit 1
    fi
    
    echo ""
    
    # 4. Git プッシュ
    print_section "Git プッシュを実行中..."
    
    if git push origin "$target_branch"; then
        print_success "プッシュが完了しました！"
        print_info "ブランチ '$target_branch' が正常にプッシュされました"
    else
        print_error "プッシュに失敗しました"
        
        # 自動起動した開発サーバーを停止
        if [ "$dev_server_started" = true ] && [ ! -z "$DEV_SERVER_PID" ]; then
            print_info "開発サーバーを停止中..."
            kill $DEV_SERVER_PID 2>/dev/null || true
        fi
        
        exit 1
    fi
    
    echo ""
    
    # 5. 後処理
    print_section "後処理を実行中..."
    
    # 自動起動した開発サーバーを停止
    if [ "$dev_server_started" = true ] && [ ! -z "$DEV_SERVER_PID" ]; then
        print_info "自動起動した開発サーバーを停止中..."
        kill $DEV_SERVER_PID 2>/dev/null || true
        print_success "開発サーバーを停止しました"
    fi
    
    echo ""
    print_success "🎉 自動テスト&プッシュが完了しました！"
    print_info "変更内容が '$target_branch' ブランチにプッシュされました"
    
    # CI/CDの情報表示
    echo ""
    print_info "📊 GitHub Actions でのテスト結果を確認："
    print_info "https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\\(.*\\)\\.git/\\1/')/actions"
}

# エラーハンドリング
cleanup() {
    if [ ! -z "$DEV_SERVER_PID" ]; then
        kill $DEV_SERVER_PID 2>/dev/null || true
    fi
}

trap cleanup EXIT

# スクリプト実行
main "$@"