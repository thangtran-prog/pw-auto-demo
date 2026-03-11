import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Wikipedia Article Page
 * Handles article content, internal links navigation, and article-specific interactions
 */
export class WikipediaArticlePage {
  public readonly page: Page;

  // Locators for article page elements
  private readonly firstHeadingLocator: Locator;
  private readonly internalLinksLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstHeadingLocator = page.locator('#firstHeading');
    this.internalLinksLocator = page.getByRole('link');
  }

  /**
   * Get the first heading (article title) locator
   */
  public getFirstHeadingLocator(): Locator {
    return this.firstHeadingLocator;
  }

  /**
   * Get all internal links that match a specific text
   */
  public getInternalLinksByText(linkText: string): Locator {
    return this.page.getByRole('link', { name: linkText });
  }

  /**
   * Get all internal links
   */
  public getAllInternalLinks(): Locator {
    return this.internalLinksLocator;
  }

  /**
   * Click on an internal link by exact text match
   */
  public async clickInternalLinkByText(linkText: string): Promise<void> {
    const links = await this.getInternalLinksByText(linkText).all();
    for (const link of links) {
      const text = await link.textContent();
      if (text?.trim() === linkText.trim()) {
        await link.click();
        break;
      }
    }
  }

  /**
   * Navigate to an article by title
   */
  public async navigateToArticle(articleTitle: string): Promise<void> {
    await this.page.goto(`https://www.wikipedia.org/wiki/${articleTitle}`);
  }

  /**
   * Check if current page URL matches an article title pattern
   */
  public async isOnArticle(articleTitle: string): Promise<boolean> {
    const url = this.page.url();
    return url.includes(articleTitle);
  }

  /**
   * Get article title from heading
   */
  public async getArticleTitle(): Promise<string | null> {
    return await this.firstHeadingLocator.textContent();
  }
}
