import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Koithe Main Page
 * Handles main page interactions including logo, menu, and drink categories
 */
export class KoitheMainPage {
  public readonly page: Page;
  private readonly mainPageUrl: string = 'https://www.koithe.com/en/main.php';
  private readonly homePageUrl: string = 'https://www.koithe.com/en/home.php';

  // Locators for main page elements
  private readonly mainLogoLocator: Locator;
  private readonly homeTitleLocator: Locator;
  private readonly circleMenuLocator: Locator;
  private readonly drinkCategoryLocator: Locator;
  private readonly navigationMenuLocator: Locator;
  private readonly menuHoveredLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainLogoLocator = page.locator("//*[name()='g' and @id='d']");
    this.homeTitleLocator = page.locator("//div[@class='name' and text()='HOME']");
    this.circleMenuLocator = page.locator("//div[@class='circle']/img[@src='./images/menu.svg']");
    this.drinkCategoryLocator = page.locator("//div[@class='article-area flex-container']/div[@class='ch']");
    this.navigationMenuLocator = page.locator("//div[normalize-space()='(NAVIGATION)']");
    this.menuHoveredLocator = page.locator("//div[@class='menu-hover is-show']/div[@class='circle-hover']/img");
  }

  /**
   * Navigate to the main page
   */
  public async navigateToMainPage(): Promise<void> {
    await this.page.goto(this.mainPageUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  }

  /**
   * Navigate to the home page
   */
  public async navigateToHomePage(): Promise<void> {
    await this.page.goto(this.homePageUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  }

  /**
   * Clear cookies before navigation
   */
  public async clearCookies(): Promise<void> {
    await this.page.context().clearCookies();
  }

  /**
   * Get the main logo locator for assertions
   */
  public getMainLogoLocator(): Locator {
    return this.mainLogoLocator;
  }

  /**
   * Get the home title locator for assertions
   */
  public getHomeTitleLocator(): Locator {
    return this.homeTitleLocator;
  }

  /**
   * Get the circle menu locator
   */
  public getCircleMenuLocator(): Locator {
    return this.circleMenuLocator;
  }

  /**
   * Get the drink category locator
   */
  public getDrinkCategoryLocator(): Locator {
    return this.drinkCategoryLocator;
  }

  /**
   * Get the navigation menu locator
   */
  public getNavigationMenuLocator(): Locator {
    return this.navigationMenuLocator;
  }

  /**
   * Get the hovered menu locator
   */
  public getMenuHoveredLocator(): Locator {
    return this.menuHoveredLocator;
  }

  /**
   * Hover over the circle menu to reveal navigation options
   */
  public async hoverOverCircleMenu(): Promise<void> {
    await this.circleMenuLocator.hover();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Get all drink categories as strings
   */
  public async getAllDrinkCategories(): Promise<string[]> {
    return (await this.drinkCategoryLocator.allTextContents()).map(text => text.trim());
  }

  /**
   * Get count of drink categories
   */
  public async getDrinkCategoryCount(): Promise<number> {
    return await this.drinkCategoryLocator.count();
  }

  /**
   * Wait for menu hover effect
   */
  public async waitForMenuHover(): Promise<void> {
    await this.page.waitForTimeout(500);
  }
}
