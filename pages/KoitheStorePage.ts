import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Koithe Store Page
 * Handles store listing, filtering by country, and store management
 */
export class KoitheStorePage {
  public readonly page: Page;

  // Locators for store page elements
  private readonly storeListAreaLocator: Locator;
  private readonly storeNameLocator: Locator;
  private readonly countryNamesLocator: Locator;
  private readonly vietnamCountryLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.storeListAreaLocator = page.locator("//div[@class='storeList-area']");
    this.storeNameLocator = page.locator("//div[@class='storeList-area']//div[@class='title']");
    this.countryNamesLocator = page.locator("//div[@class='store' and contains(text(),'(Country)')]//following-sibling::ul//div[@class='title']");
    this.vietnamCountryLocator = page.getByText('VIETNAM');
  }

  /**
   * Get all store names from the store list
   */
  public async getAllStoreNames(): Promise<string[]> {
    return (await this.storeNameLocator.allTextContents()).map(text => text.trim());
  }

  /**
   * Get count of stores displayed
   */
  public async getStoreCount(): Promise<number> {
    return await this.storeNameLocator.count();
  }

  /**
   * Get store name locator for assertions
   */
  public getStoreNameLocator(): Locator {
    return this.storeNameLocator;
  }

  /**
   * Get all country names
   */
  public async getAllCountryNames(): Promise<string[]> {
    return (await this.countryNamesLocator.allTextContents()).map(text => text.trim());
  }

  /**
   * Get count of countries in the dropdown
   */
  public async getCountryCount(): Promise<number> {
    return await this.countryNamesLocator.count();
  }

  /**
   * Get country names locator for assertions
   */
  public getCountryNamesLocator(): Locator {
    return this.countryNamesLocator;
  }

  /**
   * Select a country to filter stores
   */
  public async selectCountry(countryName: string): Promise<void> {
    await this.page.getByText(countryName).click();
  }

  /**
   * Get all store names for a specific country after filtering
   */
  public async getStoresForCountry(): Promise<string[]> {
    return (await this.storeNameLocator.allTextContents()).map(text => text.trim());
  }

  /**
   * Get Vietnam country locator for assertions
   */
  public getVietnamCountryLocator(): Locator {
    return this.vietnamCountryLocator;
  }

  /**
   * Check if specific store is in the list
   */
  public async isStoreInList(storeName: string): Promise<boolean> {
    const stores = await this.getAllStoreNames();
    return stores.includes(storeName);
  }

  /**
   * Get text locator for any text on the page
   */
  public getTextLocator(text: string): Locator {
    return this.page.getByText(text);
  }
}
