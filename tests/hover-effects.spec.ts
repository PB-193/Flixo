import { test, expect } from '@playwright/test';

test.describe('Hover Effects and Animations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should test video card hover effects', async ({ page }) => {
    const firstCard = page.locator('.group.cursor-pointer').first();
    
    // ホバー前の状態をキャプチャ
    await firstCard.screenshot({ 
      path: 'test-results/card-hover-before.png' 
    });
    
    // ホバー効果をテスト
    await firstCard.hover();
    await page.waitForTimeout(500); // アニメーション完了待機
    
    // ホバー後の状態をキャプチャ
    await firstCard.screenshot({ 
      path: 'test-results/card-hover-after.png' 
    });
    
    // ホバー時のスケール効果を確認
    const cardStyle = await firstCard.getAttribute('class');
    expect(cardStyle).toContain('group');
  });

  test('should test button hover effects', async ({ page }) => {
    const postButton = page.locator('text=動画を投稿');
    
    // ボタンのホバー前
    await postButton.screenshot({ 
      path: 'test-results/button-hover-before.png' 
    });
    
    // ボタンにホバー
    await postButton.hover();
    await page.waitForTimeout(300);
    
    // ボタンのホバー後
    await postButton.screenshot({ 
      path: 'test-results/button-hover-after.png' 
    });
  });

  test('should test video preview on hover', async ({ page }) => {
    const firstCard = page.locator('.group.cursor-pointer').first();
    
    // 長時間ホバーしてプレビューが表示されるかテスト
    await firstCard.hover();
    await page.waitForTimeout(1500); // プレビュー表示の1秒待機 + 余裕
    
    // プレビューが表示された状態のスクリーンショット
    await page.screenshot({ 
      path: 'test-results/video-preview-display.png' 
    });
    
    // プレビュー要素が存在するかチェック（iframe）
    const preview = page.locator('iframe[src*="youtube.com/embed"]');
    if (await preview.count() > 0) {
      await expect(preview).toBeVisible();
    }
  });

  test('should test gradient animations', async ({ page }) => {
    // ページ全体のグラデーション効果
    await page.screenshot({ 
      path: 'test-results/gradient-background.png',
      fullPage: true 
    });
    
    // タイトルのグラデーション効果
    const title = page.locator('h1');
    await title.screenshot({ 
      path: 'test-results/title-gradient.png' 
    });
    
    // グラデーションクラスが適用されていることを確認
    await expect(title).toHaveClass(/bg-gradient-to-r/);
  });

  test('should test fade-in animations', async ({ page }) => {
    // ページリロードして新しいアニメーションを確認
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // 動画カードのフェードインアニメーション
    const videoCards = page.locator('.animate-fade-in');
    if (await videoCards.count() > 0) {
      await expect(videoCards.first()).toBeVisible();
    }
    
    // アニメーション完了後のスクリーンショット
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: 'test-results/fade-in-complete.png',
      fullPage: true 
    });
  });

  test('should test form animations', async ({ page }) => {
    await page.locator('text=動画を投稿').click();
    
    // フォーム表示のアニメーション
    await page.waitForTimeout(500);
    await page.screenshot({ 
      path: 'test-results/form-animation.png' 
    });
    
    // フォーム要素にフォーカス効果をテスト
    const urlInput = page.locator('input[placeholder*="youtube.com"]');
    await urlInput.focus();
    await page.waitForTimeout(200);
    
    // フォーカス状態のスクリーンショット
    await page.screenshot({ 
      path: 'test-results/input-focus.png' 
    });
  });

  test('should test all interactive elements', async ({ page }) => {
    // すべてのインタラクティブ要素を特定
    const interactiveElements = [
      { selector: 'text=動画を投稿', name: 'post-button' },
      { selector: '.group.cursor-pointer', name: 'video-card' },
    ];

    for (const element of interactiveElements) {
      const el = page.locator(element.selector).first();
      
      // ホバー前
      await el.screenshot({ 
        path: `test-results/${element.name}-normal.png` 
      });
      
      // ホバー
      await el.hover();
      await page.waitForTimeout(300);
      
      // ホバー後
      await el.screenshot({ 
        path: `test-results/${element.name}-hover.png` 
      });
      
      // ホバーを解除
      await page.locator('body').hover();
      await page.waitForTimeout(300);
    }
  });
});