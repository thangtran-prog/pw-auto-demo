import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Wikipedia Language Switching
 * Handles language selection and navigation to different language versions
 */
export class WikipediaLanguagePage {
  public readonly page: Page;

  // Locators for language switching elements
  private readonly languageDropdownLocator: Locator;
  private readonly selectedLanguageLocator: Locator;
  private readonly vietnameseLabelLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.languageDropdownLocator = page.getByLabel('en');
    this.selectedLanguageLocator = page.getByLabel('vi');
    this.vietnameseLabelLocator = page.getByLabel('vi');
  }

  /**
   * Select a language from the dropdown
   */
  public async selectLanguage(language: string): Promise<void> {
    await this.languageDropdownLocator.selectOption(language);
  }

  /**
   * Get the language dropdown locator
   */
  public getLanguageDropdownLocator(): Locator {
    return this.languageDropdownLocator;
  }

  /**
   * Get the selected language indicator locator (Vietnamese in this case)
   */
  public getSelectedLanguageLocator(): Locator {
    return this.selectedLanguageLocator;
  }

  /**
   * Get Wikipedia header locator for Vietnamese version
   */
  public getVietnameseWikipediaHeaderLocator(): Locator {
    return this.page.getByRole('link', { name: 'Wikipedia Bách khoa toàn thư' });
  }

  /**
   * Check if page URL contains Vietnamese Wikipedia path
   */
  public async isOnVietnameseWikipedia(): Promise<boolean> {
    const url = this.page.url();
    return url.includes('vi.wikipedia.org');
  }
}
