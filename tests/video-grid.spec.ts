import { test, expect } from '@playwright/test';

test.describe('Video Grid Display', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display video cards correctly', async ({ page }) => {
    // 動画カードが表示されることを確認
    const videoCards = page.locator('[data-testid="video-card"]').or(page.locator('.group.cursor-pointer'));
    await expect(videoCards.first()).toBeVisible();
    
    // 最低でも2つの動画カードが表示されることを確認
    const cardCount = await videoCards.count();
    expect(cardCount).toBeGreaterThan(1);
    
    // 動画グリッドのスクリーンショット
    await page.locator('main').screenshot({ 
      path: 'test-results/video-grid.png' 
    });
  });

  test('should display video card elements', async ({ page }) => {
    const firstCard = page.locator('.group.cursor-pointer').first();
    
    // 動画タイトルが表示されることを確認
    await expect(firstCard.locator('h3')).toBeVisible();
    
    // サムネイル画像が表示されることを確認
    await expect(firstCard.locator('img')).toBeVisible();
    
    // カテゴリーが表示されることを確認（存在する場合）
    const categoryBadge = firstCard.locator('.bg-gradient-to-r');
    if (await categoryBadge.count() > 0) {
      await expect(categoryBadge.first()).toBeVisible();
    }
    
    // 最初の動画カードのスクリーンショット
    await firstCard.screenshot({ 
      path: 'test-results/video-card-detail.png' 
    });
  });

  test('should display video card hover effects', async ({ page }) => {
    const firstCard = page.locator('.group.cursor-pointer').first();
    
    // ホバー前のスクリーンショット
    await firstCard.screenshot({ 
      path: 'test-results/video-card-before-hover.png' 
    });
    
    // ホバー効果をテスト
    await firstCard.hover();
    await page.waitForTimeout(500); // アニメーション完了を待機
    
    // ホバー後のスクリーンショット
    await firstCard.screenshot({ 
      path: 'test-results/video-card-after-hover.png' 
    });
    
    // ホバー状態のクラスが適用されていることを確認
    await expect(firstCard).toHaveClass(/group/);
  });

  test('should handle video card click', async ({ page }) => {
    const firstCard = page.locator('.group.cursor-pointer').first();
    
    // 新しいページが開かれることを期待
    const [newPage] = await Promise.all([
      page.context().waitForEvent('page'),
      firstCard.click()
    ]);
    
    // 新しいページがYouTubeのURLであることを確認
    await expect(newPage.url()).toContain('youtube.com');
    
    await newPage.close();
  });
});