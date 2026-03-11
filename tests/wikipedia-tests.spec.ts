import { test, expect } from '@playwright/test';
import { WikipediaMainPage } from '../pages/WikipediaMainPage';
import { WikipediaSearchPage } from '../pages/WikipediaSearchPage';
import { WikipediaLanguagePage } from '../pages/WikipediaLanguagePage';
import { WikipediaArticlePage } from '../pages/WikipediaArticlePage';
import { WikipediaLoginPage } from '../pages/WikipediaLoginPage';

/**
 * TC1: Verify main page loaded
 * Validates that the Wikipedia main page loads correctly with all key elements visible
 */
test('TC1: Verify main page loaded', async ({ page }) => {
  const mainPage = new WikipediaMainPage(page);
  await mainPage.navigateToMainPage();

  // Verify logo, search box, and top languages are visible in the main page
  await expect(mainPage.getLogoLocator()).toBeVisible();
  console.log('Logo is visible');
  
  await expect(mainPage.getSearchBoxLocator()).toBeVisible();
  console.log('Search box is visible');
  
  await expect(mainPage.getTopLanguagesLocator()).toBeVisible();
  console.log('Top languages are visible');
});

/**
 * TC2: Verify search functionality
 * Validates that the search functionality works correctly for searching an article
 */
test('TC2: Verify search functionality', async ({ page }) => {
  const mainPage = new WikipediaMainPage(page);
  const searchPage = new WikipediaSearchPage(page);

  await mainPage.navigateToMainPage();
  await searchPage.searchFor('Donald Trump');

  // Verify that the search results page is loaded and contains the expected content
  await expect(page).toHaveURL(/.*Donald_Trump.*/);
  await expect(searchPage.getFirstHeadingLocator().getByText('Donald Trump')).toBeVisible();
  console.log('Search results page is loaded and contains the expected content');
});

/**
 * TC3: Verify change language
 * Validates that language can be switched and search works in the selected language
 */
test('TC3: Verify change language', async ({ page }) => {
  const mainPage = new WikipediaMainPage(page);
  const languagePage = new WikipediaLanguagePage(page);
  const searchPage = new WikipediaSearchPage(page);

  await mainPage.navigateToMainPage();

  // Select Vietnamese language from the dropdown
  await languagePage.selectLanguage('Tiếng Việt');

  // Verify that the Vietnamese language is selected
  await expect(languagePage.getSelectedLanguageLocator()).toBeVisible();

  // Fill the search box and press Enter
  await searchPage.searchFor('Hà Nội');

  // Verify that the search results page is loaded and contains the expected content
  await expect(page).toHaveURL(/.*vi\.wikipedia\.org.*/);
  console.log('URL is changed correctly');
  
  await expect(languagePage.getVietnameseWikipediaHeaderLocator()).toBeVisible();
  console.log('Language is switched to Vietnamese');
  
  await expect(searchPage.getFirstHeadingLocator().getByText('Hà Nội')).toBeVisible();
  console.log('Search results page is loaded and contains the expected content');
});

/**
 * TC4: Verify suggestion functionality
 * Validates that search suggestions appear and contain relevant results
 */
test('TC4: Verify suggestion functionality', async ({ page }) => {
  const mainPage = new WikipediaMainPage(page);
  const searchPage = new WikipediaSearchPage(page);

  await mainPage.navigateToMainPage();

  // Fill the search box and wait for suggestions
  await searchPage.fillSearchBox('Artifi');
  await searchPage.waitForSuggestions();

  // Verify that the suggestion results are loaded and contains the expected content
  const countSuggestion = await searchPage.getSuggestionCount();

  expect(countSuggestion).toBeGreaterThan(0);
  console.log(`Number of suggestions: ${countSuggestion}`);

  await expect(searchPage.getFirstSuggestion()).toHaveText(/Artifi/);

  const suggestions = await searchPage.getAllSuggestionTexts();
  for (let i = 0; i < suggestions.length; i++) {
    await expect(searchPage.getSuggestionByIndex(i)).toBeVisible();
    console.log(`Suggestion ${i + 1} is visible: ${suggestions[i]}`);
  }

  console.log('Suggestion results are loaded and contains the expected content');
});

/**
 * TC5: Verify internal links navigation
 * Validates that users can navigate through internal Wikipedia links
 */
test('TC5: Verify internal links navigation', async ({ page }) => {
  const mainPage = new WikipediaMainPage(page);
  const searchPage = new WikipediaSearchPage(page);
  const articlePage = new WikipediaArticlePage(page);

  await mainPage.navigateToMainPage();

  // Fill the search box and wait for suggestions
  await searchPage.fillSearchBox('Elon Musk');
  await searchPage.waitForSuggestions();

  // Verify that the suggestion results are loaded
  const countSuggestion = await searchPage.getSuggestionCount();
  expect(countSuggestion).toBeGreaterThan(0);
  console.log(`Number of suggestions: ${countSuggestion}`);

  await expect(searchPage.getFirstSuggestion()).toHaveText(/Elon Musk/);
  await searchPage.clickSuggestionByIndex(0);

  // Verify page title
  await expect(page).toHaveURL(/.*Elon_Musk.*/);
  await expect(articlePage.getFirstHeadingLocator().getByText('Elon Musk')).toBeVisible();

  // Verify navigation to internal links
  await articlePage.clickInternalLinkByText('Tesla, Inc.');

  // Verify that the Tesla, Inc. page is loaded
  await expect(page).toHaveURL(/.*Tesla,_Inc.*/);
  await expect(articlePage.getFirstHeadingLocator().getByText('Tesla, Inc.')).toBeVisible();
  console.log('Suggestion results are loaded and contains the expected content');
});

/**
 * TC6: Verify login with credentials
 * Validates that users can log in with valid credentials
 */
test('TC6: Verify login with credentials', async ({ page }) => {
  const username = 'Myuserxxx';
  const password = 'X123456x';

  const mainPage = new WikipediaMainPage(page);
  const loginPage = new WikipediaLoginPage(page);

  // Navigate to the main page
  await mainPage.navigateToWikiMainPage();
  await expect(page.getByRole('heading', { name: 'Welcome to Wikipedia' })).toBeVisible();
  console.log('Main page is loaded successfully');

  // Click on the "Log in" link
  await loginPage.navigateToLoginPage();
  await expect(loginPage.getLoginHeadingLocator()).toBeVisible();
  console.log('Login page is loaded successfully');

  // Fill in the login form with credentials and submit
  console.log(`Filling in login form with username: ${username} and password: ${password}`);
  await loginPage.login(username, password);

  // Verify logged in successfully
  await expect(loginPage.getLoggedInUserLocator()).toBeVisible();
  await expect(loginPage.getLoggedInUserLocator()).toHaveText(username);
  console.log('User is logged in successfully');
});

/**
 * TC7: [Negative] Verify search with invalid input
 * Validates that search with invalid characters returns no results
 */
test('TC7: [Negative] Verify search with invalid input', async ({ page }) => {
  const mainPage = new WikipediaMainPage(page);
  const searchPage = new WikipediaSearchPage(page);

  await mainPage.navigateToMainPage();

  // Fill the search box and press Enter
  await searchPage.searchFor('abc12345!@#$%^&*');

  // Verify that search results not found
  await expect(page.getByRole('heading', { name: 'Search results' })).toBeVisible();
  await expect(searchPage.getNoResultsMessageLocator()).toBeVisible();
  console.log('Search results not found for invalid input as expected');
});

/**
 * TC8: [Negative] Verify search with empty input
 * Validates that search with empty input behaves as expected
 */
test('TC8: [Negative] Verify search with empty input', async ({ page }) => {
  const mainPage = new WikipediaMainPage(page);
  const searchPage = new WikipediaSearchPage(page);

  await mainPage.navigateToMainPage();

  // Fill the search box with empty string and press Enter
  await searchPage.searchFor('');

  // Verify that search results page appears but no results found
  await expect(searchPage.getSearchHeadingLocator()).toBeVisible();
  await expect(searchPage.getNoResultsMessageLocator()).toBeHidden();
  console.log('Search results not found for empty input as expected');
});

/**
 * TC9: [Negative] Verify search with special script
 * Validates that search with script injection is handled correctly
 */
test('TC9: [Negative] Verify search with special script', async ({ page }) => {
  const scriptInput = "<script>alert('XSS')</script>";

  const mainPage = new WikipediaMainPage(page);
  const searchPage = new WikipediaSearchPage(page);

  await mainPage.navigateToMainPage();

  // Fill the search box and press Enter
  await searchPage.searchFor(scriptInput);

  // Verify that search results is shown
  await expect(page.getByRole('heading', { name: 'Search results' })).toBeVisible();
  await expect(searchPage.getTextLocator('Showing results for script')).toContainText('No results found for ' + scriptInput);

  console.log('Search results not found for special script input as expected');
});

/**
 * TC10: [Negative] Verify login with invalid credentials
 * Validates that login with invalid credentials shows error message
 */
test('TC10: [Negative] Verify login with invalid credentials', async ({ page }) => {
  const mainPage = new WikipediaMainPage(page);
  const loginPage = new WikipediaLoginPage(page);

  // Navigate to the main page
  await mainPage.navigateToWikiMainPage();
  await expect(page.getByRole('heading', { name: 'Welcome to Wikipedia' })).toBeVisible();
  console.log('Main page is loaded successfully');

  // Click on the "Log in" link
  await loginPage.navigateToLoginPage();
  await expect(loginPage.getLoginHeadingLocator()).toBeVisible();
  console.log('Login page is loaded successfully');

  // Fill in the login form with invalid credentials and submit
  await loginPage.login('invalid_username', 'invalid_password');

  // Verify that an error message is displayed
  await expect(loginPage.getErrorMessageLocator()).toBeVisible();
  await expect(loginPage.getErrorMessageLocator()).toHaveText(/Incorrect username or password/);
  console.log('Error message is displayed for invalid login credentials as expected');
});
