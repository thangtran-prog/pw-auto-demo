import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Wikipedia Main Page
 * Handles interactions with the main landing page of Wikipedia
 */
export class WikipediaMainPage {
  public readonly page: Page;
  private readonly mainPageUrl: string = 'https://www.wikipedia.org/';

  // Locators for main page elements
  private readonly logoLocator: Locator;
  private readonly searchBoxLocator: Locator;
  private readonly topLanguagesLocator: Locator;
  private readonly languageDropdownLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoLocator = page.getByRole('heading', { name: 'Wikipedia 25 years of the' }).locator('span');
    this.searchBoxLocator = page.getByRole('searchbox', { name: 'Search Wikipedia' });
    this.topLanguagesLocator = page.getByRole('navigation', { name: 'Top languages' });
    this.languageDropdownLocator = page.getByLabel('en');
  }

  /**
   * Navigate to Wikipedia main page
   */
  public async navigateToMainPage(): Promise<void> {
    await this.page.goto(this.mainPageUrl);
  }

  /**
   * Verify main page is loaded correctly by checking visibility of key elements
   */
  public async verifyMainPageLoaded(): Promise<void> {
    await this.logoLocator.isVisible();
    await this.searchBoxLocator.isVisible();
    await this.topLanguagesLocator.isVisible();
  }

  /**
   * Get the logo locator for assertions
   */
  public getLogoLocator(): Locator {
    return this.logoLocator;
  }

  /**
   * Get the search box locator for assertions
   */
  public getSearchBoxLocator(): Locator {
    return this.searchBoxLocator;
  }

  /**
   * Get the top languages locator for assertions
   */
  public getTopLanguagesLocator(): Locator {
    return this.topLanguagesLocator;
  }

  /**
   * Get the language dropdown locator for assertions
   */
  public getLanguageDropdownLocator(): Locator {
    return this.languageDropdownLocator;
  }

  /**
   * Navigate to Wikipedia main page wiki section
   */
  public async navigateToWikiMainPage(): Promise<void> {
    await this.page.goto(this.mainPageUrl + 'wiki/Main_Page');
  }
}
