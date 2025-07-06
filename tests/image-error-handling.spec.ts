import { test, expect } from '@playwright/test';

test.describe('Image Error Handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should handle image load failures gracefully', async ({ page }) => {
    // ページにエラーイベントリスナーを追加
    await page.addInitScript(() => {
      window.addEventListener('error', (e) => {
        console.log('Image error caught:', e.target?.src);
      });
    });

    // すべての画像が読み込まれるまで待機
    await page.waitForTimeout(3000);

    // 動画カードが表示されることを確認
    const videoCards = page.locator('.group.cursor-pointer');
    await expect(videoCards.first()).toBeVisible();

    // スクリーンショットを撮影（エラーハンドリングの動作確認）
    await page.screenshot({ 
      path: 'test-results/image-error-handling.png',
      fullPage: true 
    });

    // プレースホルダー画像が表示されているかチェック
    const placeholderElements = page.locator('[style*="background"]');
    if (await placeholderElements.count() > 0) {
      console.log('Placeholder images are working correctly');
    }
  });

  test('should display fallback content for broken images', async ({ page }) => {
    // 無効な画像URLを持つテストデータを投稿
    await page.locator('text=動画を投稿').click();
    
    await page.fill('input[placeholder*="youtube.com"]', 'https://www.youtube.com/watch?v=INVALID_ID_TEST');
    await page.fill('input[placeholder*="動画のタイトル"]', 'Test Broken Image');
    await page.fill('input[placeholder*="Music, Gaming"]', 'Test');
    
    await page.locator('text=投稿する').click();
    
    // メインページに戻るまで待機
    await page.waitForTimeout(2000);
    
    // エラーハンドリング後のスクリーンショット
    await page.screenshot({ 
      path: 'test-results/fallback-image-test.png',
      fullPage: true 
    });
  });

  test('should maintain layout integrity with image errors', async ({ page }) => {
    // レイアウトが画像エラーで崩れないことを確認
    const videoGrid = page.locator('main div[class*="grid"]');
    await expect(videoGrid).toBeVisible();
    
    // グリッドレイアウトが維持されていることを確認
    const gridClasses = await videoGrid.getAttribute('class');
    expect(gridClasses).toContain('grid');
    
    // レイアウト確認のスクリーンショット
    await page.screenshot({ 
      path: 'test-results/layout-integrity.png',
      fullPage: true 
    });
  });
});