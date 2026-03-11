# Quick Start Guide - Page Object Model Usage

## 🎯 5-Minute Quick Start

### 1. Import Page Objects
```typescript
import { test, expect } from '@playwright/test';
import { WikipediaMainPage } from '../pages/WikipediaMainPage';
import { WikipediaSearchPage } from '../pages/WikipediaSearchPage';
```

### 2. Initialize in Test
```typescript
test('My test', async ({ page }) => {
  const mainPage = new WikipediaMainPage(page);
  const searchPage = new WikipediaSearchPage(page);
  // Now use them!
});
```

### 3. Use Page Object Methods
```typescript
// Navigate
await mainPage.navigateToMainPage();

// Perform actions
await searchPage.searchFor('Donald Trump');

// Assert using page object getters
await expect(searchPage.getFirstHeadingLocator()).toHaveText('Donald Trump');
```

---

## 🏗️ Common Patterns

### Pattern: Action + Assert
```typescript
test('TC1: Test with action and assertion', async ({ page }) => {
  const loginPage = new WikipediaLoginPage(page);
  
  // Navigate
  await loginPage.navigateToLoginPage();
  
  // Assert navigation worked
  await expect(loginPage.getLoginHeadingLocator()).toBeVisible();
  
  // Perform action
  await loginPage.login('username', 'password');
  
  // Assert action worked
  await expect(loginPage.getLoggedInUserLocator()).toBeVisible();
});
```

### Pattern: Multi-Step Flow
```typescript
test('TC2: Multi-step navigation', async ({ page }) => {
  // Initialize multiple page objects
  const mainPage = new KoitheMainPage(page);
  const navMenu = new KoitheNavigationMenu(page);
  const storePage = new KoitheStorePage(page);
  
  // Flow: Home → Store → Filter
  await mainPage.navigateToMainPage();
  await navMenu.navigateToStore();
  
  // Get data
  const stores = await storePage.getAllStoreNames();
  expect(stores.length).toBeGreaterThan(0);
  
  // Filter
  await storePage.selectCountry('VIETNAM');
  const vietnamStores = await storePage.getStoresForCountry();
  expect(vietnamStores).toContain('Le Thanh Ton');
});
```

### Pattern: Data Extraction + Validation
```typescript
test('TC3: Extract and validate data', async ({ page }) => {
  const searchPage = new WikipediaSearchPage(page);
  const mainPage = new WikipediaMainPage(page);
  
  // Navigate
  await mainPage.navigateToMainPage();
  
  // Type search
  await searchPage.fillSearchBox('Artificial');
  
  // Wait for suggestions
  await searchPage.waitForSuggestions();
  
  // Extract data
  const suggestionCount = await searchPage.getSuggestionCount();
  const suggestions = await searchPage.getAllSuggestionTexts();
  
  // Validate
  expect(suggestionCount).toBeGreaterThan(0);
  expect(suggestions[0]).toContain('Artificial');
  
  console.log(`Found ${suggestionCount} suggestions:`, suggestions);
});
```

### Pattern: Error Handling
```typescript
test('TC4: Negative test with error handling', async ({ page }) => {
  const loginPage = new WikipediaLoginPage(page);
  
  try {
    await loginPage.navigateToLoginPage();
    await loginPage.login('invalid', 'invalid');
    
    // Check for error
    await expect(loginPage.getErrorMessageLocator()).toBeVisible();
    console.log('Error displayed as expected');
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});
```

### Pattern: Waiting for Dynamic Content
```typescript
test('TC5: Wait for animations', async ({ page }) => {
  const ourTeaPage = new KoitheOurTeaPage(page);
  
  // Navigate
  await ourTeaPage.navigateToOurTeaPage();
  
  // Get initial image
  const initialImage = await ourTeaPage.getCurrentImageSrc();
  
  // Wait for image to load properly
  await ourTeaPage.waitForImageLoad();
  
  // Wait for animation
  await ourTeaPage.waitForImageAnimation(5000);
  
  // Check if image changed
  const newImage = await ourTeaPage.getCurrentImageSrc();
  expect(newImage).not.toBe(initialImage);
});
```

---

## 📋 Page Object Methods Cheat Sheet

### Wikipedia Main Page
```typescript
const mainPage = new WikipediaMainPage(page);

// Navigation
await mainPage.navigateToMainPage();      // Go to https://www.wikipedia.org/
await mainPage.navigateToWikiMainPage();  // Go to main wiki page

// Assertions
await expect(mainPage.getLogoLocator()).toBeVisible();
await expect(mainPage.getSearchBoxLocator()).toBeVisible();
await expect(mainPage.getTopLanguagesLocator()).toBeVisible();
```

### Wikipedia Search Page
```typescript
const searchPage = new WikipediaSearchPage(page);

// Actions
await searchPage.searchFor('Term');           // Search and press Enter
await searchPage.fillSearchBox('Term');       // Just type
await searchPage.performSearch();             // Just press Enter

// Wait
await searchPage.waitForSuggestions(1000);

// Get Data
const count = await searchPage.getSuggestionCount();
const texts = await searchPage.getAllSuggestionTexts();

// Click
await searchPage.clickSuggestionByIndex(0);

// Assertions
await expect(searchPage.getSearchBoxLocator()).toBeVisible();
await expect(searchPage.getFirstHeadingLocator()).toHaveText('Donald Trump');
await expect(searchPage.getNoResultsMessageLocator()).toBeVisible();
```

### Wikipedia Language Page
```typescript
const langPage = new WikipediaLanguagePage(page);

// Actions
await langPage.selectLanguage('Tiếng Việt');

// Check
const isVietnamese = await langPage.isOnVietnameseWikipedia();

// Assertions
await expect(langPage.getSelectedLanguageLocator()).toBeVisible();
```

### Wikipedia Article Page
```typescript
const articlePage = new WikipediaArticlePage(page);

// Actions
await articlePage.clickInternalLinkByText('Tesla, Inc.');
await articlePage.navigateToArticle('Wikipedia');

// Get Data
const title = await articlePage.getArticleTitle();

// Check
const onArticle = await articlePage.isOnArticle('Elon_Musk');

// Assertions
await expect(articlePage.getFirstHeadingLocator()).toHaveText('Elon Musk');
```

### Wikipedia Login Page
```typescript
const loginPage = new WikipediaLoginPage(page);

// Actions
await loginPage.navigateToLoginPage();
await loginPage.login('user', 'pass');      // Complete flow
await loginPage.fillUsername('user');
await loginPage.fillPassword('pass');
await loginPage.clickLoginButton();

// Assertions
await expect(loginPage.getLoginHeadingLocator()).toBeVisible();
await expect(loginPage.getLoggedInUserLocator()).toHaveText('user');
await expect(loginPage.getErrorMessageLocator()).toHaveText(/Incorrect/);
```

### Koithe Main Page
```typescript
const mainPage = new KoitheMainPage(page);

// Actions
await mainPage.navigateToMainPage();
await mainPage.clearCookies();
await mainPage.hoverOverCircleMenu();
await mainPage.waitForMenuHover();

// Get Data
const drinks = await mainPage.getAllDrinkCategories();
const count = await mainPage.getDrinkCategoryCount();

// Assertions
await expect(mainPage.getMainLogoLocator()).toBeVisible();
await expect(mainPage.getHomeTitleLocator()).toBeVisible();
```

### Koithe Navigation Menu
```typescript
const navMenu = new KoitheNavigationMenu(page);

// Actions
await navMenu.navigateToAbout();
await navMenu.navigateToOurTea();
await navMenu.navigateToStore();
await navMenu.navigateToContact();
await navMenu.hoverOverCircleMenu();

// Assertions
await expect(navMenu.getAboutTitleLocator()).toBeVisible();
await expect(navMenu.getOurTeaTitleLocator()).toBeVisible();
```

### Koithe Our Tea Page
```typescript
const ourTeaPage = new KoitheOurTeaPage(page);

// Actions
await ourTeaPage.navigateToOurTeaPage();
await ourTeaPage.waitForImageLoad(5);      // Max 5 retries
await ourTeaPage.waitForImageAnimation(5000);

// Get Data
const src = await ourTeaPage.getCurrentImageSrc();
const loaded = await ourTeaPage.isImageLoaded();

// Assertions
await expect(ourTeaPage.getOurTeaTitleLocator()).toBeVisible();
await expect(ourTeaPage.getActiveImageLocator()).toBeVisible();
```

### Koithe Store Page
```typescript
const storePage = new KoitheStorePage(page);

// Get Data
const stores = await storePage.getAllStoreNames();
const countries = await storePage.getAllCountryNames();
const storeCount = await storePage.getStoreCount();
const countryCount = await storePage.getCountryCount();

// Actions
await storePage.selectCountry('VIETNAM');

// Get Filtered Data
const vietnamStores = await storePage.getStoresForCountry();

// Check
const hasStore = await storePage.isStoreInList('Aperia Mall');

// Assertions
await expect(storePage.getStoreNameLocator()).toBeVisible();
expect(stores).toContain('Aperia Mall');
```

### Koithe Contact Page
```typescript
const contactPage = new KoitheContactPage(page);

// Actions
await contactPage.navigateToContactPage();
await contactPage.fillName('John Doe');
await contactPage.fillEmail('john@example.com');
await contactPage.fillPhone('1234567890');
await contactPage.fillMessage('Test message');
await contactPage.fillContactForm('Name', 'email@test.com', 'Message');
await contactPage.selectArea('VIETNAM');
await contactPage.selectCategory('Business cooperation');

// Get Data
const areaOptions = await contactPage.getAreaOptions();
const selectedArea = await contactPage.getSelectedArea();
const selectedCategory = await contactPage.getSelectedCategory();

// Actions
await contactPage.submitForm();

// Assertions
await expect(contactPage.getNameInputLocator()).toBeVisible();
await expect(contactPage.getContactTitleLocator()).toBeVisible();
await expect(contactPage.getErrorMessageLocator()).toBeVisible();
```

---

## 🧪 Real-World Examples

### Example 1: Wikipedia Search and Navigation
```typescript
test('Search and navigate to internal article', async ({ page }) => {
  const mainPage = new WikipediaMainPage(page);
  const searchPage = new WikipediaSearchPage(page);
  const articlePage = new WikipediaArticlePage(page);
  
  // Go to Wikipedia
  await mainPage.navigateToMainPage();
  
  // Search for person
  await searchPage.searchFor('Elon Musk');
  await searchPage.waitForSuggestions();
  
  // Click first suggestion
  await searchPage.clickSuggestionByIndex(0);
  
  // Navigate to related article
  await articlePage.clickInternalLinkByText('Tesla, Inc.');
  
  // Verify final page
  const title = await articlePage.getArticleTitle();
  expect(title).toContain('Tesla');
});
```

### Example 2: Koithe Store Filtering
```typescript
test('View stores and filter by country', async ({ page }) => {
  const mainPage = new KoitheMainPage(page);
  const navMenu = new KoitheNavigationMenu(page);
  const storePage = new KoitheStorePage(page);
  
  // Navigate to store page
  await mainPage.navigateToMainPage();
  await navMenu.navigateToStore();
  
  // Get all stores initially
  const allStores = await storePage.getAllStoreNames();
  console.log('Total stores:', allStores.length);
  
  // Filter by Vietnam
  const countries = await storePage.getAllCountryNames();
  expect(countries).toContain('VIETNAM');
  
  await storePage.selectCountry('VIETNAM');
  const vietnamStores = await storePage.getStoresForCountry();
  
  // Verify different results
  expect(vietnamStores.length).toBeLessThan(allStores.length);
  expect(vietnamStores).toContain('Le Thanh Ton');
});
```

### Example 3: Form Submission with Validation
```typescript
test('Fill contact form and verify validation', async ({ page }) => {
  const contactPage = new KoitheContactPage(page);
  
  // Navigate to contact
  await contactPage.navigateToContactPage();
  
  // Verify all fields exist
  await expect(contactPage.getNameInputLocator()).toBeVisible();
  await expect(contactPage.getEmailInputLocator()).toBeVisible();
  await expect(contactPage.getMessageInputLocator()).toBeVisible();
  
  // Fill form
  await contactPage.fillContactForm('Test User', 'test@example.com', 'Hello');
  await contactPage.selectArea('VIETNAM');
  await contactPage.selectCategory('General');
  
  // Submit (will fail due to missing required fields)
  await contactPage.submitForm();
  
  // Check error message
  await expect(contactPage.getErrorMessageLocator()).toBeVisible();
});
```

---

## 🔍 Debugging Tips

### Print Element Location
```typescript
const page = new WikipediaSearchPage(page);
const locator = page.getSearchBoxLocator();

// Get element info
const boundingBox = await locator.boundingBox();
console.log('Element location:', boundingBox);

// Take screenshot
await page.page.screenshot({ path: 'debug.png' });
```

### Debug Selectors
```typescript
const searchPage = new WikipediaSearchPage(page);

// Count elements
const count = await searchPage.getSuggestionCount();
console.log('Found', count, 'suggestions');

// Get text
const texts = await searchPage.getAllSuggestionTexts();
console.log('Suggestion texts:', texts);
```

### Log During Test
```typescript
test('Test with logging', async ({ page }) => {
  const mainPage = new WikipediaMainPage(page);
  
  console.log('1. Navigating...');
  await mainPage.navigateToMainPage();
  
  console.log('2. Getting logo...');
  const logo = mainPage.getLogoLocator();
  
  console.log('3. Verifying...');
  await expect(logo).toBeVisible();
  
  console.log('✓ Test passed!');
});
```

---

## 🚨 Common Mistakes & Solutions

### ❌ Wrong: Creating new page object per method
```typescript
test('Bad practice', async ({ page }) => {
  // Don't do this!
  const search1 = new WikipediaSearchPage(page);
  await search1.fillSearchBox('term');
  
  const search2 = new WikipediaSearchPage(page); // Wrong - new instance
  await search2.performSearch();
});
```

### ✅ Correct: Reuse same page object
```typescript
test('Good practice', async ({ page }) => {
  const searchPage = new WikipediaSearchPage(page);
  await searchPage.fillSearchBox('term');
  await searchPage.performSearch(); // Same instance
});
```

### ❌ Wrong: Mixing inline selectors with page objects
```typescript
test('Bad mixing', async ({ page }) => {
  const searchPage = new WikipediaSearchPage(page);
  await searchPage.searchFor('term');
  
  // Don't do inline selectors too!
  await page.locator('#someId').click();
});
```

### ✅ Correct: Use page objects for everything
```typescript
test('Pure page object', async ({ page }) => {
  const searchPage = new WikipediaSearchPage(page);
  const articlePage = new WikipediaArticlePage(page);
  
  await searchPage.searchFor('term');
  await articlePage.getFirstHeadingLocator(); // Use page object
});
```

---

## 📞 Support & Resources

For detailed information, see:
- [POM_ARCHITECTURE.md](./POM_ARCHITECTURE.md) - Full architecture guide
- [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - Complete summary

For Playwright docs:
- [Playwright.dev](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)

---

**Happy Testing! 🎉**
