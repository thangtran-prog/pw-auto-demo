import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Wikipedia Search Page
 * Handles search functionality, suggestions, and search results
 */
export class WikipediaSearchPage {
  public readonly page: Page;

  // Locators for search page elements
  private readonly searchBoxLocator: Locator;
  private readonly suggestionsDropdownLocator: Locator;
  private readonly suggestionItemsLocator: Locator;
  private readonly searchResultsHeadingLocator: Locator;
  private readonly firstHeadingLocator: Locator;
  private readonly noResultsMessageLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBoxLocator = page.getByRole('searchbox', { name: 'Search Wikipedia' });
    this.suggestionsDropdownLocator = page.locator("//div[@class='suggestions-dropdown']");
    this.suggestionItemsLocator = page.locator("//div[@class='suggestions-dropdown']//h3");
    this.searchResultsHeadingLocator = page.getByRole('heading', { name: 'Search results' });
    this.firstHeadingLocator = page.locator('#firstHeading');
    this.noResultsMessageLocator = page.getByText('There were no results');
  }

  /**
   * Fill the search box with a search term
   */
  public async fillSearchBox(searchTerm: string): Promise<void> {
    await this.searchBoxLocator.fill(searchTerm);
  }

  /**
   * Perform search by pressing Enter
   */
  public async performSearch(): Promise<void> {
    await this.searchBoxLocator.press('Enter');
  }

  /**
   * Search for a term and press Enter
   */
  public async searchFor(searchTerm: string): Promise<void> {
    await this.fillSearchBox(searchTerm);
    await this.performSearch();
  }

  /**
   * Wait for suggestions to appear
   */
  public async waitForSuggestions(timeout: number = 1000): Promise<void> {
    await this.page.waitForTimeout(timeout);
  }

  /**
   * Get count of suggestion items
   */
  public async getSuggestionCount(): Promise<number> {
    return await this.suggestionItemsLocator.count();
  }

  /**
   * Get all suggestion texts
   */
  public async getAllSuggestionTexts(): Promise<string[]> {
    return await this.suggestionItemsLocator.allTextContents();
  }

  /**
   * Click on a specific suggestion by index
   */
  public async clickSuggestionByIndex(index: number): Promise<void> {
    await this.suggestionItemsLocator.nth(index).click();
  }

  /**
   * Get suggestion locator by index
   */
  public getSuggestionByIndex(index: number): Locator {
    return this.suggestionItemsLocator.nth(index);
  }

  /**
   * Get first suggestion locator
   */
  public getFirstSuggestion(): Locator {
    return this.suggestionItemsLocator.first();
  }

  /**
   * Get the search box locator for assertions
   */
  public getSearchBoxLocator(): Locator {
    return this.searchBoxLocator;
  }

  /**
   * Get search results heading locator for assertions
   */
  public getSearchResultsHeadingLocator(): Locator {
    return this.searchResultsHeadingLocator;
  }

  /**
   * Get first heading locator for article titles
   */
  public getFirstHeadingLocator(): Locator {
    return this.firstHeadingLocator;
  }

  /**
   * Get no results message locator for negative test assertions
   */
  public getNoResultsMessageLocator(): Locator {
    return this.noResultsMessageLocator;
  }

  /**
   * Get search heading locator (generic search page heading)
   */
  public getSearchHeadingLocator(): Locator {
    return this.page.getByRole('heading', { name: 'Search' });
  }

  /**
   * Get text from page that might indicate search results
   */
  public getTextLocator(text: string): Locator {
    return this.page.getByText(text);
  }
}
