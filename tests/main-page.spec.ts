import { test, expect } from '@playwright/test';

test.describe('Flixo Main Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the main page and take screenshot', async ({ page }) => {
    // ページが完全に読み込まれるまで待機
    await page.waitForLoadState('networkidle');
    
    // ヘッダーが表示されることを確認
    await expect(page.locator('h1')).toContainText('Flixo');
    
    // 投稿ボタンが表示されることを確認
    await expect(page.locator('text=動画を投稿')).toBeVisible();
    
    // フルページのスクリーンショットを撮影
    await page.screenshot({ 
      path: 'test-results/main-page-full.png', 
      fullPage: true 
    });
    
    // ビューポートのスクリーンショットを撮影
    await page.screenshot({ 
      path: 'test-results/main-page-viewport.png' 
    });
  });

  test('should display header elements correctly', async ({ page }) => {
    // ヘッダータイトルのスタイル確認
    const title = page.locator('h1');
    await expect(title).toHaveClass(/text-6xl font-extrabold/);
    
    // サブタイトルの確認
    await expect(page.locator('text=YouTube動画を美しくシェアする')).toBeVisible();
    
    // ヘッダー部分のスクリーンショット
    await page.locator('header').screenshot({ 
      path: 'test-results/header-section.png' 
    });
  });

  test('should display gradient background correctly', async ({ page }) => {
    // 背景要素の確認
    const background = page.locator('div').first();
    await expect(background).toHaveClass(/bg-gradient-to-br/);
    
    // 背景のスクリーンショット
    await page.screenshot({ 
      path: 'test-results/background-gradient.png',
      fullPage: true 
    });
  });
});