import { test, expect } from '@playwright/test';

test.describe('Video Post Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should open video post form', async ({ page }) => {
    // 投稿ボタンをクリック
    await page.locator('text=動画を投稿').click();
    
    // フォームが表示されることを確認
    await expect(page.locator('text=YouTubeの動画URLを入力して')).toBeVisible();
    
    // フォームのスクリーンショット
    await page.screenshot({ 
      path: 'test-results/video-post-form.png' 
    });
  });

  test('should display form elements correctly', async ({ page }) => {
    await page.locator('text=動画を投稿').click();
    
    // 必要なフォーム要素が表示されることを確認
    await expect(page.locator('input[placeholder*="youtube.com"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="動画のタイトル"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="Music, Gaming"]')).toBeVisible();
    await expect(page.locator('input[placeholder*="動画の説明"]')).toBeVisible();
    
    // 送信ボタンとキャンセルボタンが表示されることを確認
    await expect(page.locator('text=投稿する')).toBeVisible();
    await expect(page.locator('text=キャンセル')).toBeVisible();
    
    // フォーム要素の詳細スクリーンショット
    const form = page.locator('form');
    await form.screenshot({ 
      path: 'test-results/form-elements.png' 
    });
  });

  test('should validate required fields', async ({ page }) => {
    await page.locator('text=動画を投稿').click();
    
    // 空のフォームで送信を試行
    await page.locator('text=投稿する').click();
    
    // バリデーションエラーが表示されることを確認（HTML5バリデーション）
    const urlInput = page.locator('input[placeholder*="youtube.com"]');
    await expect(urlInput).toBeFocused();
    
    // バリデーション状態のスクリーンショット
    await page.screenshot({ 
      path: 'test-results/form-validation.png' 
    });
  });

  test('should submit form with valid data', async ({ page }) => {
    await page.locator('text=動画を投稿').click();
    
    // フォームに有効なデータを入力
    await page.fill('input[placeholder*="youtube.com"]', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    await page.fill('input[placeholder*="動画のタイトル"]', 'Test Video Title');
    await page.fill('input[placeholder*="Music, Gaming"]', 'Test Category');
    await page.fill('input[placeholder*="動画の説明"]', 'Test Description');
    
    // 入力後のフォームスクリーンショット
    await page.screenshot({ 
      path: 'test-results/form-filled.png' 
    });
    
    // フォームを送信
    await page.locator('text=投稿する').click();
    
    // メインページに戻ることを確認
    await expect(page.locator('h1')).toContainText('Flixo');
    
    // 新しい動画が追加されたことを確認（最初のカードが新しい動画）
    const firstCard = page.locator('.group.cursor-pointer').first();
    await expect(firstCard.locator('h3')).toContainText('Test Video Title');
    
    // 送信後のページスクリーンショット
    await page.screenshot({ 
      path: 'test-results/after-submission.png',
      fullPage: true 
    });
  });

  test('should cancel form submission', async ({ page }) => {
    await page.locator('text=動画を投稿').click();
    
    // キャンセルボタンをクリック
    await page.locator('text=キャンセル').click();
    
    // メインページに戻ることを確認
    await expect(page.locator('h1')).toContainText('Flixo');
    await expect(page.locator('text=動画を投稿')).toBeVisible();
    
    // キャンセル後のページスクリーンショット
    await page.screenshot({ 
      path: 'test-results/after-cancel.png' 
    });
  });
});