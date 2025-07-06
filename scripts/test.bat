@echo off
REM Flixo テスト実行スクリプト (Windows)
REM Usage: scripts\test.bat [option]

setlocal enabledelayedexpansion

set "option=%1"
if "%option%"=="" set "option=all"

echo.
echo 🎬 ===============================================
echo    Flixo - YouTube動画シェアサイト テストスイート
echo ===============================================
echo.

REM ヘルプ表示
if "%option%"=="help" (
    echo Usage: scripts\test.bat [option]
    echo.
    echo Options:
    echo   all       - 全テストを実行（デフォルト）
    echo   ui        - UIモードでテスト実行
    echo   headed    - ヘッドモードでテスト実行
    echo   debug     - デバッグモードでテスト実行
    echo   visual    - ビジュアルテストのみ実行
    echo   mobile    - モバイルテストのみ実行
    echo   desktop   - デスクトップテストのみ実行
    echo   install   - Playwrightブラウザのインストール
    echo   clean     - テスト結果をクリーンアップ
    echo   report    - HTMLレポートを開く
    echo   help      - このヘルプを表示
    goto :end
)

REM 前提条件チェック
echo 🔧 前提条件をチェック中...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.jsがインストールされていません
    goto :error
)

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npmがインストールされていません
    goto :error
)

if not exist "node_modules" (
    echo ⚠️  依存関係がインストールされていません
    echo ℹ️  npm install を実行中...
    npm install
)

echo ✅ 前提条件チェック完了
echo.

REM テストディレクトリ準備
echo 🔧 テストディレクトリを準備中...
if not exist "test-results" mkdir test-results
if not exist "playwright-report" mkdir playwright-report
echo ✅ テストディレクトリ準備完了
echo.

REM コマンド別処理
if "%option%"=="clean" (
    echo 🔧 テスト結果をクリーンアップ中...
    if exist "test-results" rmdir /s /q test-results
    if exist "playwright-report" rmdir /s /q playwright-report
    mkdir test-results
    mkdir playwright-report
    echo ✅ クリーンアップ完了
    goto :end
)

if "%option%"=="install" (
    echo 🔧 Playwrightブラウザをインストール中...
    npx playwright install
    echo ✅ ブラウザのインストール完了
    goto :end
)

if "%option%"=="report" (
    echo 🔧 HTMLレポートを開いています...
    if exist "playwright-report\index.html" (
        start playwright-report\index.html
        echo ✅ HTMLレポートを開きました
    ) else (
        echo ❌ HTMLレポートが見つかりません。先にテストを実行してください。
    )
    goto :end
)

REM 開発サーバーチェック（UIモード以外）
if not "%option%"=="ui" if not "%option%"=="debug" (
    echo 🔧 開発サーバーをチェック中...
    curl -s http://localhost:3001 >nul 2>nul
    if %errorlevel% neq 0 (
        echo ❌ 開発サーバーを起動してからテストを実行してください
        echo ℹ️  コマンド: npm run dev
        goto :error
    )
    echo ✅ 開発サーバーが起動中です
    echo.
)

REM テスト実行
echo 🔧 テストを実行中: %option%
echo.

if "%option%"=="all" (
    npx playwright test
) else if "%option%"=="ui" (
    npx playwright test --ui
) else if "%option%"=="headed" (
    npx playwright test --headed
) else if "%option%"=="debug" (
    npx playwright test --debug
) else if "%option%"=="visual" (
    npx playwright test tests/visual-test.spec.ts
) else if "%option%"=="mobile" (
    npx playwright test --project="Mobile Chrome" --project="Mobile Safari"
) else if "%option%"=="desktop" (
    npx playwright test --project="chromium"
) else (
    echo ❌ 不明なテストモード: %option%
    goto :error
)

if %errorlevel% equ 0 (
    echo.
    echo ✅ テストが完了しました！
    echo.
    echo 🔧 テスト結果サマリー
    echo ℹ️  HTMLレポート: scripts\test.bat report で開けます
    if exist "test-results\results.json" (
        echo ℹ️  詳細な結果は test-results\results.json をご確認ください
    )
) else (
    echo.
    echo ❌ テストが失敗しました
    echo ℹ️  詳細は上記のログまたは HTML レポートをご確認ください
    goto :error
)

goto :end

:error
exit /b 1

:end
echo.
endlocal