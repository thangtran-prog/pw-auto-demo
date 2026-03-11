import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Koithe Contact Page
 * Handles contact form interactions, input fields, and form submission
 */
export class KoitheContactPage {
  public readonly page: Page;
  private readonly contactPageUrl: string = 'https://www.koithe.com/en/contact.php';

  // Locators for contact form elements
  private readonly contactTitleLocator: Locator;
  private readonly nameInputLocator: Locator;
  private readonly areaDropdownLocator: Locator;
  private readonly emailInputLocator: Locator;
  private readonly phoneInputLocator: Locator;
  private readonly categoryDropdownLocator: Locator;
  private readonly messageInputLocator: Locator;
  private readonly submitButtonLocator: Locator;
  private readonly areaDropdownOptionsLocator: Locator;
  private readonly categoryDropdownSpanLocator: Locator;
  private readonly areaDropdownSpanLocator: Locator;
  private readonly errorMessageLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.contactTitleLocator = page.locator("//div[@class='name' and text()='CONTACT']");
    this.nameInputLocator = page.locator("//input[@id='name']");
    this.areaDropdownLocator = page.locator("//div[@class='nice-select ask-select no-first']");
    this.emailInputLocator = page.locator("//input[@id='email']");
    this.phoneInputLocator = page.locator("//input[@id='phone']");
    this.categoryDropdownLocator = page.locator("//div[@class='nice-select ask-select']");
    this.messageInputLocator = page.locator("//textarea[@id='content']");
    this.submitButtonLocator = page.locator("//button[@type='submit']");
    this.areaDropdownOptionsLocator = page.locator('//div[@class="nice-select ask-select no-first open"]//li');
    this.categoryDropdownSpanLocator = page.locator("//div[@class='nice-select ask-select']/span");
    this.areaDropdownSpanLocator = page.locator("//div[@class='nice-select ask-select no-first']/span");
    this.errorMessageLocator = page.locator("//label[@class='error' and not(contains(@style,'display: none;'))]");
  }

  /**
   * Navigate to Contact page
   */
  public async navigateToContactPage(): Promise<void> {
    await this.page.goto(this.contactPageUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });
  }

  /**
   * Get contact title locator for assertions
   */
  public getContactTitleLocator(): Locator {
    return this.contactTitleLocator;
  }

  /**
   * Get contact form input/element locators for assertions
   */
  public getNameInputLocator(): Locator {
    return this.nameInputLocator;
  }

  public getAreaDropdownLocator(): Locator {
    return this.areaDropdownLocator;
  }

  public getEmailInputLocator(): Locator {
    return this.emailInputLocator;
  }

  public getPhoneInputLocator(): Locator {
    return this.phoneInputLocator;
  }

  public getCategoryDropdownLocator(): Locator {
    return this.categoryDropdownLocator;
  }

  public getMessageInputLocator(): Locator {
    return this.messageInputLocator;
  }

  public getSubmitButtonLocator(): Locator {
    return this.submitButtonLocator;
  }

  public getErrorMessageLocator(): Locator {
    return this.errorMessageLocator;
  }

  /**
   * Fill the name field
   */
  public async fillName(name: string): Promise<void> {
    await this.nameInputLocator.fill(name);
  }

  /**
   * Fill the email field
   */
  public async fillEmail(email: string): Promise<void> {
    await this.emailInputLocator.fill(email);
  }

  /**
   * Fill the phone field
   */
  public async fillPhone(phone: string): Promise<void> {
    await this.phoneInputLocator.fill(phone);
  }

  /**
   * Fill the message field
   */
  public async fillMessage(message: string): Promise<void> {
    await this.messageInputLocator.fill(message);
  }

  /**
   * Select area from dropdown
   */
  public async selectArea(area: string): Promise<void> {
    await this.areaDropdownLocator.click();
    await this.areaDropdownLocator.selectOption(area);
    await this.page.waitForTimeout(500);
  }

  /**
   * Select category from dropdown
   */
  public async selectCategory(category: string): Promise<void> {
    await this.categoryDropdownLocator.click();
    await this.categoryDropdownLocator.selectOption(category);
    await this.page.waitForTimeout(500);
  }

  /**
   * Submit the contact form
   */
  public async submitForm(): Promise<void> {
    await this.submitButtonLocator.click();
  }

  /**
   * Get all available area options
   */
  public async getAreaOptions(): Promise<string[]> {
    return (await this.areaDropdownOptionsLocator.allTextContents()).map(text => text.trim());
  }

  /**
   * Get the selected area text
   */
  public async getSelectedArea(): Promise<string | null> {
    return await this.areaDropdownSpanLocator.textContent();
  }

  /**
   * Get the selected category text
   */
  public async getSelectedCategory(): Promise<string | null> {
    return await this.categoryDropdownSpanLocator.textContent();
  }

  /**
   * Fill all contact form fields (except dropdowns)
   */
  public async fillContactForm(name: string, email: string, phone: string, message: string): Promise<void> {
    await this.fillName(name);
    await this.fillEmail(email);
    await this.fillPhone(phone);
    await this.fillMessage(message);
  }
}
