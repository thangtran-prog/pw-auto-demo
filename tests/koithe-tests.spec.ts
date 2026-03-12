import { test, expect } from '@playwright/test';
import { KoitheMainPage } from '../pages/KoitheMainPage';
import { KoitheNavigationMenu } from '../pages/KoitheNavigationMenu';
import { KoitheOurTeaPage } from '../pages/KoitheOurTeaPage';
import { KoitheStorePage } from '../pages/KoitheStorePage';
import { KoitheContactPage } from '../pages/KoitheContactPage';

test.beforeEach(async ({ page }) => {
  // Clear cookies before each test
  await page.context().clearCookies();
});

/**
 * TC1: Verify main page loads correctly
 * Validates that the Koithe main page loads with all key elements visible
 */
test('TC1: Verify main page loads correctly', async ({ page }) => {
  const mainPage = new KoitheMainPage(page);
  try {
    await mainPage.clearCookies();
    await mainPage.navigateToHomePage();
    // Add human-like delay after navigation
    await page.waitForTimeout(2000 + Math.random() * 1000);
    await mainPage.navigateToMainPage();
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Exception:", err.message);
    try {
      await page.screenshot({ path: 'test-results/screenshot.png' });
    } catch (screenshotError: unknown) {
      console.error("Could not capture screenshot:", (screenshotError as Error).message);
    }
    throw error;
  }

  // Verify that the main page is loaded by checking the presence of key elements
  await expect(mainPage.getMainLogoLocator()).toBeVisible();
  console.log('Main logo is visible');
  
  await expect(mainPage.getHomeTitleLocator()).toBeVisible();
  console.log('Home title is visible');
  
  await expect(mainPage.getCircleMenuLocator()).toBeVisible();
  console.log('Circle menu is visible');
  
  await expect(mainPage.getNavigationMenuLocator()).toBeVisible();
  console.log('Navigation menu is visible');

  // Hover over the circle menu and verify that the hovered menu is visible
  await expect(mainPage.getMenuHoveredLocator()).not.toBeVisible();
  await mainPage.hoverOverCircleMenu();
  await expect(mainPage.getMenuHoveredLocator()).toBeVisible();
  console.log('Hovered circle menu is visible');
  
  // Check the drink category in the main page
  const drinks = await mainPage.getAllDrinkCategories();
  console.log(`Number of drinks category: ${await mainPage.getDrinkCategoryCount()}`);
  expect(drinks.length).toBeGreaterThan(0);
  expect(drinks).toContain('MILK TEA');
  for (let d of drinks) {
    console.log(`Drink category: ${d}`);
  }
});

/**
 * TC2: Verify navigate to specific section
 * Validates that users can navigate to ABOUT and OUR TEA sections through the hover menu
 */
test('TC2: Verify navigate to specific section', async ({ page }) => {
  const mainPage = new KoitheMainPage(page);
  const navigationMenu = new KoitheNavigationMenu(page);

  await mainPage.navigateToMainPage();
  await expect(mainPage.getMainLogoLocator()).toBeVisible();
  await expect(mainPage.getHomeTitleLocator()).toBeVisible();
  console.log('Main page is loaded correctly');

  // Navigate to ABOUT section
  await navigationMenu.navigateToAbout();
  await expect(navigationMenu.getAboutTitleLocator()).toBeVisible();
  console.log('Navigate to ABOUT section successfully');

  // Navigate to OUR TEA section
  await navigationMenu.navigateToOurTea();
  await expect(navigationMenu.getOurTeaTitleLocator()).toBeVisible();
  console.log('Navigate to OUR TEA section successfully');
});

/**
 * TC3: Verify dynamic image animation
 * Validates that the image carousel in OUR TEA section animates and changes images correctly
 */
test('TC3: Verify dynamic image animation', async ({ page }) => {
  const ourTeaPage = new KoitheOurTeaPage(page);

  try {
    await ourTeaPage.navigateToOurTeaPage();
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Exception:", err.message);
    try {
      await page.screenshot({ path: 'test-results/screenshot.png' });
    } catch (screenshotError: unknown) {
      console.error("Could not capture screenshot:", (screenshotError as Error).message);
    }
    throw error;
  }

  await expect(ourTeaPage.getOurTeaTitleLocator()).toBeVisible();
  console.log('OUR TEA section is loaded successfully');

  // Verify the first image is visible and loaded
  await expect(ourTeaPage.getActiveImageLocator()).toBeVisible({ timeout: 10000 });

  // Get the initial image source to compare after slide transition
  const initialSrc = await ourTeaPage.getCurrentImageSrc();
  console.log(`Initial Image: ${initialSrc}`);

  // Ensure image has been loaded completely (not broken)
  await ourTeaPage.waitForImageLoad();

  await expect(ourTeaPage.getActiveImageLocator()).toBeVisible();
  const newSrc = await ourTeaPage.getCurrentImageSrc();
  console.log(`New Image: ${newSrc}`);

  if (initialSrc === newSrc) {
    console.log("Warning: Image source did not change, waiting for a few more seconds...");
    await ourTeaPage.waitForImageAnimation();
    // Get the new src after waiting
    const newSrc2 = await ourTeaPage.getCurrentImageSrc();
    console.log(`New Image: ${newSrc2}`);
    expect(newSrc2).not.toBe(initialSrc);
  } else {
    expect(newSrc).not.toBe(initialSrc);
  }

  console.log('Image animation is working correctly');
});

/**
 * TC4: Verify store page navigation
 * Validates that the store page loads and filters stores by country correctly
 */
test('TC4: Verify store page navigation', async ({ page }) => {
  const mainPage = new KoitheMainPage(page);
  const navigationMenu = new KoitheNavigationMenu(page);
  const storePage = new KoitheStorePage(page);

  await mainPage.navigateToMainPage();
  await expect(mainPage.getMainLogoLocator()).toBeVisible();
  await expect(mainPage.getHomeTitleLocator()).toBeVisible();
  console.log('Main page is loaded correctly');

  // Navigate to STORE section using the hover circle menu
  await navigationMenu.navigateToStore();
  await expect(navigationMenu.getStoreTitleLocator()).toBeVisible();
  console.log('Navigate to STORE section successfully');

  // Get list of store names
  const listStores = await storePage.getAllStoreNames();

  // Verify the list of stores should not be empty and contain specific store name
  expect(listStores.length).toBeGreaterThan(0);
  expect(listStores).toContain('Aperia Mall');
  console.log(`Stores found: ${listStores.join(', ')}`);

  // Get list of countries
  const listCountries = await storePage.getAllCountryNames();
  console.log(`Number of countries: ${listCountries.length}`);
  expect(listCountries.length).toBeGreaterThan(0);
  expect(listCountries).toContain('VIETNAM');
  console.log(`Countries found: ${listCountries.join(', ')}`);

  // Click on the VIETNAM country and verify the store list is updated
  await storePage.selectCountry('VIETNAM');
  const listVietnamStores = await storePage.getStoresForCountry();

  // Verify Vietnam stores list
  expect(listVietnamStores.length).toBeGreaterThan(0);
  expect(listVietnamStores).toContain('Le Thanh Ton');
  console.log(`Stores in Vietnam: ${listVietnamStores.join(', ')}`);

  // Verify the list of Vietnam stores should not be in the first store list
  expect(listVietnamStores.every(store => !listStores.includes(store))).toBe(true);
  console.log('No Vietnam stores are in the general store list');

  // 2nd approach to verify
  const intersection = listVietnamStores.filter(store => listStores.includes(store));
  expect(intersection.length).toBe(0);
  console.log(`Intersection (should be empty): ${intersection.join(', ')}`);
});

/**
 * TC5: Verify contact page input fields
 * Validates that all contact form fields are visible and can be filled out
 */
test('TC5: Verify contact page input fields', async ({ page }) => {
  const contactPage = new KoitheContactPage(page);

  try {
    await contactPage.navigateToContactPage();
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Exception:", err.message);
    try {
      await page.screenshot({ path: 'test-results/screenshot.png' });
    } catch (screenshotError: unknown) {
      console.error("Could not capture screenshot:", (screenshotError as Error).message);
    }
    throw error;
  }

  await expect(contactPage.getContactTitleLocator()).toBeVisible();
  console.log('CONTACT section is loaded successfully');

  // Verify the input fields are visible and can be filled
  await expect(contactPage.getNameInputLocator()).toBeVisible();
  await expect(contactPage.getAreaDropdownLocator()).toBeVisible();
  await expect(contactPage.getPhoneInputLocator()).toBeVisible();
  await expect(contactPage.getCategoryDropdownLocator()).toBeVisible();
  await expect(contactPage.getEmailInputLocator()).toBeVisible();
  await expect(contactPage.getMessageInputLocator()).toBeVisible();
  console.log('All input fields are visible');

  // Check options present in the area dropdown
  const optionsContent = await contactPage.getAreaOptions();
  console.log(`Options in the dropdown: ${optionsContent}`);

  // Verify the dropdown options should contain specific country name
  expect(optionsContent).toContain('VIETNAM');
  await contactPage.selectArea('VIETNAM');

  // Verify the selected option is correct
  const selectedArea = await contactPage.getSelectedArea();
  expect(selectedArea).toBe('VIETNAM');
  console.log('Area selected successfully');

  // Fill the input fields and attempt to submit the form
  await contactPage.fillContactForm('Test User', 'test@example.com', '', 'This is a test message.');
  await contactPage.selectCategory('Business cooperation');

  // Verify the selected category is correct
  const selectedCategory = await contactPage.getSelectedCategory();
  expect(selectedCategory).toBe('Business cooperation');
  console.log('Category selected successfully');

  // Submit the contact form
  await contactPage.submitForm();

  // Verify error message is displayed for missing required fields (phone field is typically required)
  await expect(contactPage.getErrorMessageLocator()).toBeVisible();
  console.log('Error message is displayed for missing required fields');
});
