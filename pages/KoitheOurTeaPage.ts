import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Koithe Our Tea Page
 * Handles Our Tea section interactions including image animation verification
 */
export class KoitheOurTeaPage {
  public readonly page: Page;
  private readonly ourTeaPageUrl: string = 'https://www.koithe.com/en/ourtea.php';

  // Locators for Our Tea page elements
  private readonly ourTeaTitleLocator: Locator;
  private readonly activeImageLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ourTeaTitleLocator = page.locator("//div[@class='name' and text()='OUR TEA']");
    this.activeImageLocator = page.locator("//li[contains(@class, 'slick-current')]//img");
  }

  /**
   * Navigate to Our Tea page
   */
  public async navigateToOurTeaPage(): Promise<void> {
    await this.page.goto(this.ourTeaPageUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  }

  /**
   * Get Our Tea title locator for assertions
   */
  public getOurTeaTitleLocator(): Locator {
    return this.ourTeaTitleLocator;
  }

  /**
   * Get active image locator
   */
  public getActiveImageLocator(): Locator {
    return this.activeImageLocator;
  }

  /**
   * Get the current image source
   */
  public async getCurrentImageSrc(): Promise<string | null> {
    return await this.activeImageLocator.getAttribute('src');
  }

  /**
   * Check if image is loaded completely
   */
  public async isImageLoaded(): Promise<boolean> {
    return await this.activeImageLocator.evaluate((img: HTMLImageElement) => 
      img.complete && img.naturalWidth > 0
    );
  }

  /**
   * Wait for image to load with retries
   */
  public async waitForImageLoad(maxRetries: number = 5): Promise<void> {
    for (let i = 0; i < maxRetries; i++) {
      const isLoaded = await this.isImageLoaded();
      if (isLoaded) {
        break;
      }
      if (i < maxRetries - 1) {
        await this.page.waitForTimeout(1000);
      }
    }
  }

  /**
   * Wait for image animation (slide transition)
   */
  public async waitForImageAnimation(timeout: number = 5000): Promise<void> {
    await this.page.waitForTimeout(timeout);
  }
}
