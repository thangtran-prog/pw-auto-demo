import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Koithe Navigation Menu
 * Handles navigation between different sections (About, Our Tea, Store, Contact)
 */
export class KoitheNavigationMenu {
  public readonly page: Page;

  // Locators for navigation menu elements
  private readonly circleMenuLocator: Locator;
  private readonly menuHoveredLocator: Locator;
  private readonly aboutButtonLocator: Locator;
  private readonly ourTeaButtonLocator: Locator;
  private readonly storeButtonLocator: Locator;
  private readonly contactButtonLocator: Locator;
  private readonly aboutTitleLocator: Locator;
  private readonly ourTeaTitleLocator: Locator;
  private readonly storeTitleLocator: Locator;
  private readonly contactTitleLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.circleMenuLocator = page.locator("//div[@class='circle']/img[@src='./images/menu.svg']");
    this.menuHoveredLocator = page.locator("//div[@class='menu-hover is-show']/div[@class='circle-hover']/img");
    this.aboutButtonLocator = page.locator("//ul[@class='menuList-hover']//a[normalize-space()='ABOUT']");
    this.ourTeaButtonLocator = page.locator("//ul[@class='menuList-hover']//a[normalize-space()='OUR TEA']");
    this.storeButtonLocator = page.locator("//ul[@class='menuList-hover']//a[normalize-space()='STORE']");
    this.contactButtonLocator = page.locator("//ul[@class='menuList-hover']//a[normalize-space()='CONTACT']");
    this.aboutTitleLocator = page.locator("//div[@class='name' and text()='ABOUT']");
    this.ourTeaTitleLocator = page.locator("//div[@class='name' and text()='OUR TEA']");
    this.storeTitleLocator = page.locator("//div[@class='name' and text()='STORE']");
    this.contactTitleLocator = page.locator("//div[@class='name' and text()='CONTACT']");
  }

  /**
   * Hover over the circle menu to reveal navigation options
   */
  public async hoverOverCircleMenu(): Promise<void> {
    await this.circleMenuLocator.hover();
    await this.page.waitForTimeout(500);
  }

  /**
   * Get the hovered menu locator
   */
  public getMenuHoveredLocator(): Locator {
    return this.menuHoveredLocator;
  }

  /**
   * Navigate to About section
   */
  public async navigateToAbout(): Promise<void> {
    await this.hoverOverCircleMenu();
    await this.aboutButtonLocator.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Navigate to Our Tea section
   */
  public async navigateToOurTea(): Promise<void> {
    await this.hoverOverCircleMenu();
    await this.ourTeaButtonLocator.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Navigate to Store section
   */
  public async navigateToStore(): Promise<void> {
    await this.hoverOverCircleMenu();
    await this.storeButtonLocator.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Navigate to Contact section
   */
  public async navigateToContact(): Promise<void> {
    await this.hoverOverCircleMenu();
    await this.contactButtonLocator.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Get About button locator
   */
  public getAboutButtonLocator(): Locator {
    return this.aboutButtonLocator;
  }

  /**
   * Get Our Tea button locator
   */
  public getOurTeaButtonLocator(): Locator {
    return this.ourTeaButtonLocator;
  }

  /**
   * Get Store button locator
   */
  public getStoreButtonLocator(): Locator {
    return this.storeButtonLocator;
  }

  /**
   * Get Contact button locator
   */
  public getContactButtonLocator(): Locator {
    return this.contactButtonLocator;
  }

  /**
   * Get About title locator for assertions
   */
  public getAboutTitleLocator(): Locator {
    return this.aboutTitleLocator;
  }

  /**
   * Get Our Tea title locator for assertions
   */
  public getOurTeaTitleLocator(): Locator {
    return this.ourTeaTitleLocator;
  }

  /**
   * Get Store title locator for assertions
   */
  public getStoreTitleLocator(): Locator {
    return this.storeTitleLocator;
  }

  /**
   * Get Contact title locator for assertions
   */
  public getContactTitleLocator(): Locator {
    return this.contactTitleLocator;
  }
}
