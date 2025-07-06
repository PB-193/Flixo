import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('should display correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // デスクトップでのグリッドレイアウト確認
    const videoGrid = page.locator('main div[class*="grid"]');
    await expect(videoGrid).toHaveClass(/xl:grid-cols-4/);
    
    // デスクトップ表示のスクリーンショット
    await page.screenshot({ 
      path: 'test-results/desktop-1920x1080.png',
      fullPage: true 
    });
  });

  test('should display correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // タブレットでのグリッドレイアウト確認
    const videoGrid = page.locator('main div[class*="grid"]');
    await expect(videoGrid).toHaveClass(/lg:grid-cols-3/);
    
    // タブレット表示のスクリーンショット
    await page.screenshot({ 
      path: 'test-results/tablet-768x1024.png',
      fullPage: true 
    });
  });

  test('should display correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // モバイルでのグリッドレイアウト確認
    const videoGrid = page.locator('main div[class*="grid"]');
    await expect(videoGrid).toHaveClass(/grid-cols-1/);
    
    // モバイル表示のスクリーンショット
    await page.screenshot({ 
      path: 'test-results/mobile-375x667.png',
      fullPage: true 
    });
    
    // モバイルでのヘッダー確認
    const title = page.locator('h1');
    await expect(title).toBeVisible();
    
    // モバイルでの投稿ボタン確認
    await expect(page.locator('text=動画を投稿')).toBeVisible();
  });

  test('should handle mobile video post form', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // モバイルで投稿フォームを開く
    await page.locator('text=動画を投稿').click();
    
    // モバイルフォームのスクリーンショット
    await page.screenshot({ 
      path: 'test-results/mobile-form.png',
      fullPage: true 
    });
    
    // フォーム要素がモバイルで適切に表示されることを確認
    await expect(page.locator('input[placeholder*="youtube.com"]')).toBeVisible();
    await expect(page.locator('text=投稿する')).toBeVisible();
  });

  test('should test various breakpoints', async ({ page }) => {
    const breakpoints = [
      { width: 320, height: 568, name: 'mobile-small' },
      { width: 375, height: 667, name: 'mobile-medium' },
      { width: 414, height: 896, name: 'mobile-large' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1024, height: 768, name: 'tablet-landscape' },
      { width: 1366, height: 768, name: 'laptop' },
      { width: 1920, height: 1080, name: 'desktop' },
    ];

    for (const bp of breakpoints) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // 各ブレークポイントでのスクリーンショット
      await page.screenshot({ 
        path: `test-results/breakpoint-${bp.name}-${bp.width}x${bp.height}.png`,
        fullPage: true 
      });
      
      // 基本要素が表示されることを確認
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('text=動画を投稿')).toBeVisible();
    }
  });
});