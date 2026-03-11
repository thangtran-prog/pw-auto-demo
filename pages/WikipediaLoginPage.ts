import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Wikipedia Login Page
 * Handles login form interactions and authentication
 */
export class WikipediaLoginPage {
  public readonly page: Page;

  // Locators for login page elements
  private readonly loginHeadingLocator: Locator;
  private readonly usernameInputLocator: Locator;
  private readonly passwordInputLocator: Locator;
  private readonly loginButtonLocator: Locator;
  private readonly loggedInUserLocator: Locator;
  private readonly errorMessageLocator: Locator;
  private readonly loginLinkLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginHeadingLocator = page.getByRole('heading', { name: 'Log in' });
    this.usernameInputLocator = page.getByRole('textbox', { name: 'Username' });
    this.passwordInputLocator = page.getByRole('textbox', { name: 'Password' });
    this.loginButtonLocator = page.getByRole('button', { name: 'Log in' });
    this.loggedInUserLocator = page.locator("//a[contains(@title,'Your homepage')]/span");
    this.errorMessageLocator = page.locator('//div[@class="cdx-message__content"]');
    this.loginLinkLocator = page.getByRole('link', { name: 'Log in' });
  }

  /**
   * Navigate to login page by clicking the login link
   */
  public async navigateToLoginPage(): Promise<void> {
    await this.loginLinkLocator.click();
  }

  /**
   * Fill username field
   */
  public async fillUsername(username: string): Promise<void> {
    await this.usernameInputLocator.fill(username);
  }

  /**
   * Fill password field
   */
  public async fillPassword(password: string): Promise<void> {
    await this.passwordInputLocator.fill(password);
  }

  /**
   * Click login button
   */
  public async clickLoginButton(): Promise<void> {
    await this.loginButtonLocator.click();
  }

  /**
   * Login with provided credentials
   */
  public async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Get login heading locator for assertions
   */
  public getLoginHeadingLocator(): Locator {
    return this.loginHeadingLocator;
  }

  /**
   * Get logged in user locator for assertions
   */
  public getLoggedInUserLocator(): Locator {
    return this.loggedInUserLocator;
  }

  /**
   * Get error message locator for assertions
   */
  public getErrorMessageLocator(): Locator {
    return this.errorMessageLocator;
  }

  /**
   * Get username input locator
   */
  public getUsernameInputLocator(): Locator {
    return this.usernameInputLocator;
  }

  /**
   * Get password input locator
   */
  public getPasswordInputLocator(): Locator {
    return this.passwordInputLocator;
  }
}
