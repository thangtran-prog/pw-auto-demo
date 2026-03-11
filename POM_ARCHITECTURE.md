## Page Object Model (POM) Architecture - Playwright + TypeScript

### Overview
This document explains the refactored Playwright test suite using the Page Object Model (POM) architecture. The POM pattern provides a clean separation of concerns between locators/actions (in Page classes) and test logic (in test files).

---

## Project Structure

```
playwright-demo/
├── pages/                          # Page Object classes
│   ├── WikipediaMainPage.ts        # Wikipedia main page interactions
│   ├── WikipediaSearchPage.ts      # Wikipedia search functionality
│   ├── WikipediaLanguagePage.ts    # Language switching functionality
│   ├── WikipediaArticlePage.ts     # Article navigation
│   ├── WikipediaLoginPage.ts       # Login interactions
│   ├── KoitheMainPage.ts           # Koithe main page interactions
│   ├── KoitheNavigationMenu.ts     # Navigation menu interactions
│   ├── KoitheOurTeaPage.ts         # Our Tea section
│   ├── KoitheStorePage.ts          # Store listing and filtering
│   └── KoitheContactPage.ts        # Contact form interactions
│
├── tests/
│   ├── wikipedia-tests.spec.ts     # Wikipedia test cases (refactored)
│   └── koithe-tests.spec.ts        # Koithe test cases (refactored)
│
└── playwright.config.ts
```

---

## Page Object Classes Architecture

### Design Principles Applied

1. **Single Responsibility**: Each page class handles interactions for one specific page/section
2. **Encapsulation**: Locators are private with readonly access for modification safety
3. **Type Safety**: Explicit TypeScript types and access modifiers throughout
4. **Naming Conventions**:
   - **Classes**: PascalCase (e.g., `WikipediaLoginPage`)
   - **Methods**: camelCase (e.g., `fillUsername()`)
   - **Properties**: readonly for locators
   - **Access Modifiers**: public/private explicitly defined

### Page Object Class Structure

Each Page class follows this structure:

```typescript
import { Page, Locator } from '@playwright/test';

export class PageName {
  public readonly page: Page;
  private readonly url: string;
  
  // Readonly locators - private
  private readonly elementLocator: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.elementLocator = page.locator('selector');
  }
  
  // Public action methods
  public async actionName(): Promise<void> {
    // Action implementation
  }
  
  // Getter methods for assertions
  public getElementLocator(): Locator {
    return this.elementLocator;
  }
}
```

---

## Page Objects Created

### Wikipedia Pages

#### 1. **WikipediaMainPage**
- **Purpose**: Handle Wikipedia main page interactions
- **Key Methods**:
  - `navigateToMainPage()`: Navigate to Wikipedia home
  - `navigateToWikiMainPage()`: Navigate to wiki section
  - `verifyMainPageLoaded()`: Verify all main elements are visible
  - `getLogoLocator()`, `getSearchBoxLocator()`: For assertions

#### 2. **WikipediaSearchPage**
- **Purpose**: Handle search and suggestion functionality
- **Key Methods**:
  - `searchFor()`: Search for a term
  - `fillSearchBox()`, `performSearch()`: Individual search actions
  - `getSuggestionCount()`, `getAllSuggestionTexts()`: Get suggestion data
  - `clickSuggestionByIndex()`: Click specific suggestion
  - `getFirstHeadingLocator()`: Get article title

#### 3. **WikipediaLanguagePage**
- **Purpose**: Handle language switching
- **Key Methods**:
  - `selectLanguage()`: Switch to a language
  - `getSelectedLanguageLocator()`: Verify language selection
  - `isOnVietnameseWikipedia()`: Check URL
  - `getVietnameseWikipediaHeaderLocator()`: Get language-specific header

#### 4. **WikipediaArticlePage**
- **Purpose**: Handle article navigation and content
- **Key Methods**:
  - `clickInternalLinkByText()`: Navigate via internal links
  - `getArticleTitle()`: Get current article title
  - `isOnArticle()`: Verify article loaded

#### 5. **WikipediaLoginPage**
- **Purpose**: Handle login interactions
- **Key Methods**:
  - `login()`: Complete login flow
  - `fillUsername()`, `fillPassword()`: Fill input fields
  - `navigateToLoginPage()`: Navigate to login
  - `getLoggedInUserLocator()`, `getErrorMessageLocator()`: For assertions

### Koithe Pages

#### 1. **KoitheMainPage**
- **Purpose**: Handle main page elements and drink categories
- **Key Methods**:
  - `navigateToMainPage()`: Navigate to main page
  - `clearCookies()`: Clear cookies before navigation
  - `hoverOverCircleMenu()`: Trigger hover menu
  - `getAllDrinkCategories()`, `getDrinkCategoryCount()`: Get category data

#### 2. **KoitheNavigationMenu**
- **Purpose**: Handle navigation between sections
- **Key Methods**:
  - `navigateToAbout()`: Navigate to About section
  - `navigateToOurTea()`: Navigate to Our Tea
  - `navigateToStore()`: Navigate to Store
  - `navigateToContact()`: Navigate to Contact
  - `hoverOverCircleMenu()`: Show menu options

#### 3. **KoitheOurTeaPage**
- **Purpose**: Handle Our Tea section and image animation
- **Key Methods**:
  - `navigateToOurTeaPage()`: Navigate to Our Tea page
  - `getCurrentImageSrc()`: Get current image source
  - `isImageLoaded()`: Check if image fully loaded
  - `waitForImageLoad()`: Wait with retries for image load
  - `waitForImageAnimation()`: Wait for carousel animation

#### 4. **KoitheStorePage**
- **Purpose**: Handle store listing and filtering
- **Key Methods**:
  - `getAllStoreNames()`: Get list of stores
  - `getAllCountryNames()`: Get list of countries
  - `selectCountry()`: Filter by country
  - `getStoresForCountry()`: Get stores after filtering
  - `isStoreInList()`: Check if specific store exists

#### 5. **KoitheContactPage**
- **Purpose**: Handle contact form interactions
- **Key Methods**:
  - `navigateToContactPage()`: Navigate to contact page
  - `fillContactForm()`: Fill multiple fields at once
  - `fillName()`, `fillEmail()`, `fillPhone()`, `fillMessage()`: Fill individual fields
  - `selectArea()`, `selectCategory()`: Select dropdown options
  - `submitForm()`: Submit contact form
  - `getSelectedArea()`, `getSelectedCategory()`: Get selected values

---

## Test Initialization Pattern

### Basic Test Structure (with Page Object initialization)

```typescript
import { test, expect } from '@playwright/test';
import { PageName } from '../pages/PageName';

test('Test description', async ({ page }) => {
  // 1. Initialize Page Objects
  const pageObject = new PageName(page);
  
  // 2. Navigate and perform actions
  await pageObject.actionMethod();
  
  // 3. Assert using page object getters
  await expect(pageObject.getLocatorName()).toBeVisible();
});
```

### Example from Wikipedia Tests

```typescript
test('TC2: Verify search functionality', async ({ page }) => {
  // Initialize page objects
  const mainPage = new WikipediaMainPage(page);
  const searchPage = new WikipediaSearchPage(page);

  // Test flow
  await mainPage.navigateToMainPage();
  await searchPage.searchFor('Donald Trump');

  // Assertions using page object getters
  await expect(page).toHaveURL(/.*Donald_Trump.*/);
  await expect(searchPage.getFirstHeadingLocator().getByText('Donald Trump')).toBeVisible();
  console.log('Search results page is loaded and contains the expected content');
});
```

### Example from Koithe Tests

```typescript
test('TC1: Verify main page loads correctly', async ({ page }) => {
  // Initialize page object
  const mainPage = new KoitheMainPage(page);
  
  // Clear cookies and navigate
  await mainPage.clearCookies();
  await mainPage.navigateToMainPage();

  // Verify elements using getters
  await expect(mainPage.getMainLogoLocator()).toBeVisible();
  await expect(mainPage.getHomeTitleLocator()).toBeVisible();
  
  // Use action methods
  await mainPage.hoverOverCircleMenu();
  
  // Get data and assert
  const drinks = await mainPage.getAllDrinkCategories();
  expect(drinks).toContain('MILK TEA');
});
```

---

## Key Benefits of This POM Architecture

1. **Maintainability**: Changes to UI selectors only affect page objects, not tests
2. **Reusability**: Common page object methods can be used across multiple tests
3. **Readability**: Tests become descriptive and self-documenting
4. **Scalability**: Easy to add new pages or extend existing ones
5. **Type Safety**: TypeScript ensures compile-time error checking
6. **Parallel Testing**: Page objects are independent and support parallel test execution

---

## Best Practices Applied

### 1. Locator Organization
- Private readonly locators in constructor
- Public getter methods return Locators for test assertions
- XPath and role-based selectors combined appropriately

### 2. Method Naming
- Action methods: `fill*()`, `click*()`, `navigate*()`
- Query methods: `get*()`, `get*Count()`, `get*Locator()`
- Boolean checks: `is*()`, `check*()`

### 3. Error Handling
- Try-catch blocks for navigation with timeouts
- Screenshot capture on errors
- Meaningful console logging for debugging

### 4. Wait Strategies
- Explicit waits with `toBeVisible()`
- Custom wait methods like `waitForImageLoad()` with retries
- `waitForTimeout()` used sparingly for animations

### 5. Data Extraction
```typescript
// Getting multiple items
const items = await locator.allTextContents();
const trimmedItems = items.map(text => text.trim());

// Getting single values
const singleValue = await locator.getAttribute('src');
const textContent = await locator.textContent();
```

---

## Test Execution

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test tests/wikipedia-tests.spec.ts
```

### Run Specific Test
```bash
npx playwright test -g "TC1: Verify main page loaded"
```

### Run with UI Mode
```bash
npx playwright test --ui
```

### Generate HTML Report
```bash
npx playwright test
npx playwright show-report
```

---

## Extending the POM

### Adding a New Page Object

1. Create new file in `pages/` directory:
```typescript
// pages/NewPage.ts
import { Page, Locator } from '@playwright/test';

export class NewPage {
  public readonly page: Page;
  private readonly elementLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elementLocator = page.locator('selector');
  }

  public async actionMethod(): Promise<void> {
    // Implementation
  }

  public getElementLocator(): Locator {
    return this.elementLocator;
  }
}
```

2. Import and use in tests:
```typescript
import { NewPage } from '../pages/NewPage';

test('Test with new page', async ({ page }) => {
  const newPage = new NewPage(page);
  // Use new page object
});
```

---

## TypeScript Configuration

The project uses TypeScript with strict type checking:
- All variables have explicit types
- Access modifiers (public/private) are used consistently
- Return types are specified for all methods
- No implicit `any` types

---

## Troubleshooting

### Issue: Locator times out
- **Solution**: Use explicit waits in page object methods
- Ensure waitUntil parameter in navigation if needed

### Issue: Selector not finding element
- **Solution**: Check for dynamic IDs/classes in page object
- Use role-based or data-attributes selectors for stability

### Issue: Flaky tests
- **Solution**: Review wait strategies in page objects
- Add retry logic in critical methods like image loading

---

## Summary

This refactored POM architecture provides:
- ✅ Clear separation of concerns
- ✅ Improved test maintainability
- ✅ Better code reusability
- ✅ Enhanced type safety with TypeScript
- ✅ Scalable test framework
- ✅ Professional test organization

The business logic and validations remain identical to the original scripts while providing a much more maintainable and professional test codebase.
