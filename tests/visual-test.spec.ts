import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('should capture main page screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // メインページの全体的なスクリーンショット
    await expect(page).toHaveScreenshot('main-page.png', {
      fullPage: true,
      threshold: 0.3
    });
  });

  test('should capture video post form screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // 投稿フォームを開く
    await page.locator('text=動画を投稿').click();
    await page.waitForTimeout(500);
    
    // フォームのスクリーンショット
    await expect(page).toHaveScreenshot('video-post-form.png', {
      threshold: 0.3
    });
  });

  test('should test responsive design', async ({ page }) => {
    // デスクトップ
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // アニメーション完了を待つ
    await page.waitForTimeout(2000);
    await expect(page).toHaveScreenshot('desktop-view.png', {
      fullPage: true,
      threshold: 0.4,
      animations: 'disabled'
    });

    // モバイル
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // アニメーション完了を待つ
    await page.waitForTimeout(2000);
    await expect(page).toHaveScreenshot('mobile-view.png', {
      fullPage: true,
      threshold: 0.4,
      animations: 'disabled'
    });
  });
});