import { test, expect } from '@playwright/test';

test('search on Google', async ({ page }) => {
  await page.goto('https://www.google.com');
  
  // Thêm delay trước khi tìm kiếm
  await page.waitForTimeout(500);
  
  // Kiểm tra CAPTCHA trước khi tìm kiếm (iframe name là dynamic, ví dụ: a-pe99jqxozqsr)
  const captchaIframe = page.locator('iframe[name^="a-"]');
  const captchaVisible = await captchaIframe.count() > 0 && 
    (await captchaIframe.first().contentFrame()?.getByText('I\'m not a robot').isVisible() ||
     await captchaIframe.first().contentFrame()?.getByText('Tôi không phải là người máy').isVisible() ||
     await captchaIframe.first().contentFrame()?.getByText('reCAPTCHA').isVisible()
    );
  
  if (captchaVisible) {
    console.log('Captcha detected, skipping test...');
    test.skip();
  }
  
  const searchBar = page.locator('textarea[name="q"]');
  await searchBar.fill('Playwright TypeScript');
  
  // Delay trước khi nhấn Enter
  await page.waitForTimeout(500);
  await searchBar.press('Enter');
  
  // Kiểm tra lại CAPTCHA sau khi search (iframe name động như: a-pe99jqxozqsr)
  const captchaAfterSearch = page.locator('iframe[name^="a-"]');
  const captchaVisibleAfter = await captchaAfterSearch.count() > 0 && 
    (await captchaAfterSearch.first().contentFrame()?.getByText('I\'m not a robot').isVisible() ||
     await captchaAfterSearch.first().contentFrame()?.getByText('Tôi không phải là người máy').isVisible() ||
     await captchaAfterSearch.first().contentFrame()?.getByText('reCAPTCHA').isVisible()
    );
  
  if (captchaVisibleAfter) {
    console.log('Captcha detected after search, skipping test...');
    test.skip();
  }
  
  await expect(page.getByText(/typescript/i)).toBeVisible();
  await expect(page.getByText(/playwright/i)).toBeVisible();
});