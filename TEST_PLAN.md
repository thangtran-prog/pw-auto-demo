# Test Scenario and Test Plan Document

**Project:** Playwright Demo Automation Suite  
**Date Created:** March 12, 2026  
**Last Updated:** March 12, 2026  
**Document Version:** 1.0  

---

## 1. Overview

This document provides a comprehensive test plan covering all automated test scenarios in the Playwright test suite. The test suite consists of two main applications:

### 1.1 Wikipedia Tests
Validates core functionality of the Wikipedia website including navigation, search, language switching, user authentication, and security handling. This test suite ensures that users can effectively discover, access, and interact with Wikipedia content across different languages.

### 1.2 Koithe Tests
Tests the Koithe beverage/tea company website functionality including main page navigation, section access, image animations, store locator, and contact form submission. This suite ensures optimal user experience across key website sections.

**Total Test Cases:** 15 (10 Wikipedia + 5 Koithe)  
**Test Type:** Functional and Negative Testing  
**Automation Framework:** Playwright with TypeScript  
**Page Object Model:** Used for maintainability and reusability

---

## 2. Test Environment

### 2.1 Test URLs

| Application | URL | Notes |
|-------------|-----|-------|
| Wikipedia Main | `https://www.wikipedia.org/` | Main landing page |
| Wikipedia Articles | `https://*.wikipedia.org/wiki/*` | Article pages (various languages) |
| Wikipedia Login | `https://en.wikipedia.org/w/index.php?title=Special:UserLogin&returnto=Main+Page` | Login portal |
| Koithe Main | (Based on navigation methods) | Main website landing page |
| Koithe Pages | Sections: ABOUT, OUR TEA, STORE, CONTACT | Navigated via menu |

### 2.2 Environment Setup

- **Browser:** Chromium (default)
- **Cookie Handling:** Cookies cleared before each Koithe test (`beforeEach` hook)
- **Timeout:** 10,000ms for image load waits; 2,000-3,000ms for navigation delays
- **Screenshots:** Captured on test failure at `test-results/screenshot.png`
- **Page Object Files:** Located in `/pages/` directory

### 2.3 Test Credentials

| Username | Password | Usage |
|----------|----------|-------|
| Myuserxxx | X123456x | Valid Wikipedia login (TC6) |
| invalid_username | invalid_password | Invalid Wikipedia login (TC10) |

---

## 3. Detailed Test Scenarios

---

## **SECTION A: WIKIPEDIA TEST SCENARIOS**

---

### **Test Case 1: Verify Main Page Loaded**

| Field | Details |
|-------|---------|
| **Test ID** | WP-TC-001 |
| **Title** | Verify Wikipedia Main Page Loads Correctly |
| **Test Type** | Functional / Smoke Test |
| **Priority** | Critical |
| **Duration** | ~5 seconds |

#### Pre-Conditions
- Browser is open and ready
- No user is logged in
- Network connectivity is available
- User can access `https://www.wikipedia.org/`

#### Test Steps

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | Navigate to Wikipedia main page (`https://www.wikipedia.org/`) | Page loads successfully |
| 2 | Verify the Wikipedia logo is visible on the page | Logo element is rendered |
| 3 | Verify the search box is visible on the page | Search input field is displayed |
| 4 | Verify the top languages section is visible | Language selection panel appears |

#### Validation / Expected Results
- ✓ Wikipedia logo is visible and locatable
- ✓ Search box input field is present and interactive
- ✓ Top languages section (showing language options) is displayed
- ✓ All three components load within the default timeout
- ✓ Page is in a ready state for user interaction

---

### **Test Case 2: Verify Search Functionality**

| Field | Details |
|-------|---------|
| **Test ID** | WP-TC-002 |
| **Title** | Verify Wikipedia Search Works for Article Queries |
| **Test Type** | Functional |
| **Priority** | Critical |
| **Duration** | ~10 seconds |

#### Pre-Conditions
- Wikipedia main page is loaded (reference TC1)
- Search box is visible and accessible
- Network connectivity is available

#### Test Steps

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | From the Wikipedia main page, locate and focus the search box | Search box is in focus and ready for input |
| 2 | Type "Donald Trump" into the search box | Text appears in the search field |
| 3 | Press Enter or click the search button | Page navigates to search results or article |
| 4 | Wait for the page to load completely | Results page renders |
| 5 | Verify the URL contains "Donald_Trump" | URL changes to article or results page |
| 6 | Verify the heading "Donald Trump" is visible | Article heading is displayed |

#### Validation / Expected Results
- ✓ Search query "Donald Trump" is accepted
- ✓ URL updates to include "Donald_Trump"
- ✓ Main heading "Donald Trump" is visible on the results page
- ✓ Page content loads within timeout
- ✓ Search successfully navigates user to relevant content

---

### **Test Case 3: Verify Language Switching**

| Field | Details |
|-------|---------|
| **Test ID** | WP-TC-003 |
| **Title** | Verify Wikipedia Language Switching and Localized Search |
| **Test Type** | Functional |
| **Priority** | High |
| **Duration** | ~15 seconds |

#### Pre-Conditions
- Wikipedia main page is loaded (reference TC1)
- Language selection interface is visible
- Network connectivity is available
- Vietnamese (Tiếng Việt) is available in language options

#### Test Steps

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | From the main page, access the language selection dropdown | Language dropdown menu appears |
| 2 | Search for and select "Tiếng Việt" (Vietnamese) from the dropdown | Vietnamese language option is highlighted and selected |
| 3 | Verify that the selected language indicator updates | UI reflects the Vietnamese language selection |
| 4 | Locate and focus the search box | Search is ready for Vietnamese input |
| 5 | Type "Hà Nội" (Hanoi in Vietnamese) into the search box | Text appears in the search field |
| 6 | Press Enter to search | Page navigates to results/article |
| 7 | Wait for the page to load | Content renders |
| 8 | Verify the URL contains "vi.wikipedia.org" | URL reflects Vietnamese Wikipedia domain |
| 9 | Verify the Vietnamese Wikipedia header is visible | Page header indicates Vietnamese language |
| 10 | Verify the heading "Hà Nội" is visible | Article heading appears |

#### Validation / Expected Results
- ✓ Language successfully switches to Vietnamese (Tiếng Việt)
- ✓ URL updates to `vi.wikipedia.org` domain
- ✓ Vietnamese Wikipedia header is displayed
- ✓ Search for "Hà Nội" returns results in Vietnamese
- ✓ Article heading "Hà Nội" is visible and properly rendered
- ✓ Content is appropriately localized for Vietnam

---

### **Test Case 4: Verify Search Suggestions**

| Field | Details |
|-------|---------|
| **Test ID** | WP-TC-004 |
| **Title** | Verify Wikipedia Search Suggestion Dropdown Functionality |
| **Test Type** | Functional |
| **Priority** | High |
| **Duration** | ~8 seconds |

#### Pre-Conditions
- Wikipedia main page is loaded (reference TC1)
- Search box is visible and accessible
- Network connectivity is available for suggestion fetching
- Suggestion API is responding normally

#### Test Steps

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | Locate and focus the search box | Search box is active and ready |
| 2 | Type "Artifi" (partial keyword) into the search box | Text appears in the search field |
| 3 | Wait for suggestion dropdown to appear | Suggestion dropdown renders with results |
| 4 | Count the number of suggestions displayed | Suggestions are available (count > 0) |
| 5 | Verify first suggestion contains relevant text | First suggestion includes "Artifi" keyword |
| 6 | Iterate through all suggestions and verify each is visible | Each suggestion displays properly |

#### Validation / Expected Results
- ✓ Suggestions appear within expected timeframe
- ✓ At least one suggestion is returned (count > 0)
- ✓ First suggestion contains "Artifi" text
- ✓ All suggestions in the dropdown are visible and rendered
- ✓ Suggestions are contextually relevant to the search term
- ✓ User can interact with each suggestion

---

### **Test Case 5: Verify Internal Links Navigation**

| Field | Details |
|-------|---------|
| **Test ID** | WP-TC-005 |
| **Title** | Verify Navigation Between Wikipedia Articles via Internal Links |
| **Test Type** | Functional |
| **Priority** | High |
| **Duration** | ~15 seconds |

#### Pre-Conditions
- Wikipedia main page is loaded (reference TC1)
- Search functionality is working (reference TC2)
- Network connectivity is available
- Suggestion feature is functional (reference TC4)

#### Test Steps

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | Locate and focus the search box | Search box is active |
| 2 | Type "Elon Musk" into the search box | Text appears in the search field |
| 3 | Wait for suggestion dropdown to appear | Suggestion dropdown renders |
| 4 | Verify at least one suggestion is returned | Suggestion count > 0 |
| 5 | Verify first suggestion contains "Elon Musk" text | First suggestion is relevant |
| 6 | Click on the first suggestion (Elon Musk) | Page navigates to Elon Musk article |
| 7 | Wait for article page to load | Article content renders |
| 8 | Verify URL contains "Elon_Musk" | URL updates appropriately |
| 9 | Verify "Elon Musk" heading is visible | Article heading displays |
| 10 | Locate an internal link to "Tesla, Inc." within the article | Link is visible and clickable |
| 11 | Click on "Tesla, Inc." link | Page navigates to Tesla article |
| 12 | Wait for new article page to load | Tesla article content renders |
| 13 | Verify URL contains "Tesla,_Inc." | URL updates to Tesla article |
| 14 | Verify "Tesla, Inc." heading is visible | Article heading displays correctly |

#### Validation / Expected Results
- ✓ Search suggestion for "Elon Musk" is present
- ✓ Clicking suggestion navigates to Elon Musk article
- ✓ URL updates to reflect `Elon_Musk` article
- ✓ Article heading "Elon Musk" is displayed
- ✓ Internal link to "Tesla, Inc." is found and clickable
- ✓ Clicking internal link navigates successfully to Tesla article
- ✓ URL updates to reflect `Tesla,_Inc.` article
- ✓ Article heading "Tesla, Inc." is displayed
- ✓ Cross-article navigation works seamlessly

---

### **Test Case 6: Verify User Login with Valid Credentials**

| Field | Details |
|-------|---------|
| **Test ID** | WP-TC-006 |
| **Title** | Verify Wikipedia User Login with Valid Credentials |
| **Test Type** | Functional |
| **Priority** | High |
| **Duration** | ~20 seconds |

#### Pre-Conditions
- Browser is open and ready
- User is not logged in
- Network connectivity is available
- Valid test account exists: `Myuserxxx` / `X123456x`
- Wikipedia login page is accessible

#### Test Steps

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | Navigate to Wikipedia main page (`https://www.wikipedia.org/`) | Main page loads with "Welcome to Wikipedia" heading |
| 2 | Verify "Welcome to Wikipedia" heading is visible | Page successfully renders |
| 3 | Locate and click the "Log in" link | Login page loads |
| 4 | Wait for login form to render | Login form displays |
| 5 | Verify "Log in" heading is visible on the login page | Login page is ready for input |
| 6 | Locate the username input field | Field is visible and interactive |
| 7 | Enter username "Myuserxxx" in the username field | Username text appears in the field |
| 8 | Locate the password input field | Password field is visible and interactive |
| 9 | Enter password "X123456x" in the password field | Password is masked in the field |
| 10 | Click the "Log in" button or press Enter | Form submits |
| 11 | Wait for server to authenticate and page to redirect | Login process completes |
| 12 | Verify that the logged-in user locator/element is visible | User is authenticated |
| 13 | Verify the user name "Myuserxxx" is displayed in the user profile area | Username confirmation visible |

#### Validation / Expected Results
- ✓ Wikipedia main page loads with welcome message
- ✓ Login link is accessible
- ✓ Login form displays with username and password fields
- ✓ Credentials are accepted by the system
- ✓ User is authenticated successfully
- ✓ Username "Myuserxxx" is displayed after login
- ✓ User profile/account indicator is visible
- ✓ Session is established

---

### **Test Case 7: [Negative] Verify Search with Invalid Input**

| Field | Details |
|-------|---------|
| **Test ID** | WP-TC-007 |
| **Title** | Verify Search Behavior with Invalid Characters (Negative Test) |
| **Test Type** | Negative / Error Handling |
| **Priority** | Medium |
| **Duration** | ~8 seconds |

#### Pre-Conditions
- Wikipedia main page is loaded (reference TC1)
- Search box is visible and accessible
- Network connectivity is available

#### Test Steps

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | Locate and focus the search box | Search box is active |
| 2 | Enter invalid input "abc12345!@#$%^&*" containing special characters | Text appears in the search field |
| 3 | Press Enter to submit the search | Search is processed |
| 4 | Wait for results page to load | Page navigates to search results |
| 5 | Verify "Search results" heading is visible | Results page displays |
| 6 | Verify "No results found" or similar message is visible | System indicates no results |

#### Validation / Expected Results
- ✓ Search processes the invalid input without crashing
- ✓ Search results page is displayed
- ✓ "No results found" message is visible
- ✓ Application handles invalid characters gracefully
- ✓ No error messages or exceptions are thrown
- ✓ User is informed that no results match the query

---

### **Test Case 8: [Negative] Verify Search with Empty Input**

| Field | Details |
|-------|---------|
| **Test ID** | WP-TC-008 |
| **Title** | Verify Search Behavior with Empty Input (Negative Test) |
| **Test Type** | Negative / Edge Case |
| **Priority** | Medium |
| **Duration** | ~5 seconds |

#### Pre-Conditions
- Wikipedia main page is loaded (reference TC1)
- Search box is visible and accessible
- Network connectivity is available

#### Test Steps

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | Locate and focus the search box | Search box is active |
| 2 | Leave search box empty (do not enter any text) | Search field remains empty |
| 3 | Press Enter to submit empty search | Search is processed |
| 4 | Wait for the search results page to load | Page navigates to results |
| 5 | Verify "Search results" heading or equivalent is visible | Results page displays |
| 6 | Verify that the "No results found" message is NOT visible | Empty search behaves differently than invalid input |

#### Validation / Expected Results
- ✓ Empty search is processed without error
- ✓ Search results page appears
- ✓ "No results found" message is not displayed
- ✓ System handles empty input gracefully
- ✓ User experience is not impacted by empty search

---

### **Test Case 9: [Negative] Verify Search with Script Injection**

| Field | Details |
|-------|---------|
| **Test ID** | WP-TC-009 |
| **Title** | Verify Security: Search Properly Handles Script Injection Attempts (Negative Test) |
| **Test Type** | Negative / Security |
| **Priority** | High |
| **Duration** | ~8 seconds |

#### Pre-Conditions
- Wikipedia main page is loaded (reference TC1)
- Search box is visible and accessible
- Network connectivity is available
- Application has XSS protection mechanisms in place

#### Test Steps

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | Locate and focus the search box | Search box is active |
| 2 | Enter script injection attempt: `<script>alert('XSS')</script>` | Text appears in the search field |
| 3 | Press Enter to submit the search | Search is processed |
| 4 | Wait for results page to load | Page loads safely without executing script |
| 5 | Verify "Search results" heading is visible | Results page displays normally |
| 6 | Verify the application does not execute the injected script | No alert box appears |
| 7 | Verify text "Showing results for script" or similar is displayed | Results indicate the search term was treated as literal text |
| 8 | Verify "No results found for" message contains the full search text | Search term is displayed safely as text |

#### Validation / Expected Results
- ✓ Script injection attempt is treated as literal search text
- ✓ JavaScript code is NOT executed
- ✓ No alert or unexpected behavior occurs
- ✓ Search results page displays normally
- ✓ Search term is safely displayed in results message
- ✓ Application is protected against XSS attacks via search
- ✓ Security is maintained when handling malicious input

---

### **Test Case 10: [Negative] Verify Login with Invalid Credentials**

| Field | Details |
|-------|---------|
| **Test ID** | WP-TC-010 |
| **Title** | Verify Login Error Handling with Invalid Credentials (Negative Test) |
| **Test Type** | Negative / Security |
| **Priority** | High |
| **Duration** | ~15 seconds |

#### Pre-Conditions
- Browser is open and ready
- User is not logged in
- Network connectivity is available
- Wikipedia login page is accessible
- Invalid credentials: `invalid_username` / `invalid_password`

#### Test Steps

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | Navigate to Wikipedia main page (`https://www.wikipedia.org/`) | Main page loads |
| 2 | Verify "Welcome to Wikipedia" heading is visible | Page displays welcome message |
| 3 | Locate and click the "Log in" link | Login page loads |
| 4 | Wait for login form to render | Login form displays |
| 5 | Verify "Log in" heading is visible on the login page | Login page is ready |
| 6 | Locate the username input field | Field is visible and interactive |
| 7 | Enter username "invalid_username" in the username field | Username text appears |
| 8 | Locate the password input field | Password field is visible and interactive |
| 9 | Enter password "invalid_password" in the password field | Password is masked |
| 10 | Click the "Log in" button or press Enter | Form submits |
| 11 | Wait for server response and page to process | Authentication attempt completes |
| 12 | Verify that an error message is displayed | Error message appears on the page |
| 13 | Verify error message contains text "Incorrect username or password" | Specific error message is shown |

#### Validation / Expected Results
- ✓ Login form accepts the invalid credentials
- ✓ Form submission is processed
- ✓ Authentication fails (as expected)
- ✓ Error message is displayed to the user
- ✓ Error message contains "Incorrect username or password"
- ✓ User remains on or is returned to login page
- ✓ User is NOT logged in
- ✓ System properly validates credentials and reports failures

---

## **SECTION B: KOITHE TEST SCENARIOS**

---

### **Test Case 11: Verify Main Page Loads Correctly**

| Field | Details |
|-------|---------|
| **Test ID** | KT-TC-001 |
| **Title** | Verify Koithe Main Page Loads with All Key Elements |
| **Test Type** | Functional / Smoke Test |
| **Priority** | Critical |
| **Duration** | ~5-10 seconds |

#### Pre-Conditions
- Browser is open and ready
- No cookies are stored (or cookies are cleared)
- Network connectivity is available
- Koithe website is accessible
- User is not logged in (or in default state)

#### Test Steps

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | Clear all stored cookies from the browser context | Cookies are removed |
| 2 | Navigate to Koithe home page | Home page loads |
| 3 | Add human-like delay (2-3 seconds) to simulate natural browsing | Page continues loading |
| 4 | Navigate to Koithe main page (if different from home) | Main page accessible |
| 5 | Wait for all page elements to render | Page is fully loaded |
| 6 | Verify the main logo is visible | Logo element is displayed |
| 7 | Verify the home title is visible | Title heading appears |
| 8 | Verify the circle menu is visible | Circle menu interface is displayed |
| 9 | Verify the navigation menu is visible | Standard navigation menu is present |
| 10 | Hover over the circle menu | Hover state is triggered |
| 11 | Verify the hovered menu items are now visible | Menu expands on hover |
| 12 | Wait for menu transition to complete (500ms) | Menu animation completes |
| 13 | Retrieve list of all drink categories displayed on the page | Categories are extracted |
| 14 | Verify at least one drink category exists (count > 0) | Drink categories are present |
| 15 | Verify "MILK TEA" is among the drink categories | Expected category is found |
| 16 | Log all drink categories for verification | Categories are displayed in console |

#### Validation / Expected Results
- ✓ Main page loads successfully without errors
- ✓ Main logo is visible and properly positioned
- ✓ Home title heading is displayed
- ✓ Primary circle menu is visible
- ✓ Navigation menu is accessible
- ✓ Hover menu interaction works and reveals additional menu items
- ✓ At least one drink category is displayed
- ✓ "MILK TEA" category is present in the drink list
- ✓ Drink categories are properly rendered
- ✓ All key page elements are functional

---

### **Test Case 12: Verify Navigation to Specific Sections**

| Field | Details |
|-------|---------|
| **Test ID** | KT-TC-002 |
| **Title** | Verify Navigation Between ABOUT and OUR TEA Sections |
| **Test Type** | Functional |
| **Priority** | High |
| **Duration** | ~10 seconds |

#### Pre-Conditions
- Koithe main page is loaded (reference TC11)
- Main logo and home title are visible
- Navigation menu is accessible and functional
- Network connectivity is available

#### Test Steps

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | From the main page, verify main logo is visible | Logo element is confirmed |
| 2 | Verify home title is visible | Title heading is confirmed |
| 3 | Locate the ABOUT section link in the navigation menu | Link is visible and accessible |
| 4 | Click the ABOUT section link | Page navigates to ABOUT section |
| 5 | Wait for ABOUT section to load | Section content renders |
| 6 | Verify the ABOUT section title is visible | "ABOUT" heading appears on the page |
| 7 | Confirm ABOUT section content is displayed | Section content is accessible |
| 8 | Locate the OUR TEA section link in the navigation menu | Link is visible and accessible |
| 9 | Click the OUR TEA section link | Page navigates to OUR TEA section |
| 10 | Wait for OUR TEA section to load | Section content renders |
| 11 | Verify the OUR TEA section title is visible | "OUR TEA" heading appears on the page |
| 12 | Confirm OUR TEA section content is displayed | Section content is accessible |

#### Validation / Expected Results
- ✓ Main page elements (logo, title) are visible
- ✓ ABOUT section link is accessible in navigation
- ✓ Clicking ABOUT navigates successfully to that section
- ✓ ABOUT section title is displayed
- ✓ OUR TEA section link is accessible in navigation
- ✓ Clicking OUR TEA navigates successfully to that section
- ✓ OUR TEA section title is displayed
- ✓ Navigation between sections is smooth and responsive

---

### **Test Case 13: Verify Dynamic Image Animation**

| Field | Details |
|-------|---------|
| **Test ID** | KT-TC-003 |
| **Title** | Verify Image Carousel Animation in OUR TEA Section |
| **Test Type** | Functional |
| **Priority** | High |
| **Duration** | ~15-20 seconds |

#### Pre-Conditions
- Koithe main page is loaded (reference TC11)
- OUR TEA section is accessible and navigable (reference TC12)
- Network connectivity is available
- Images are fully loaded before verification

#### Test Steps

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | Navigate to the OUR TEA section | Section page loads |
| 2 | Wait for OUR TEA section to fully load | Content renders completely |
| 3 | Verify OUR TEA section title is visible | Section heading appears |
| 4 | Locate the active image in the carousel | First image is displayed |
| 5 | Verify the active image is visible and loaded | Image element is rendered |
| 6 | Wait for image to fully load (up to 10 seconds) | Image loading completes |
| 7 | Extract the source (src) attribute of the current image | Initial image source is captured |
| 8 | Log the initial image source for reference | Initial state is recorded |
| 9 | Wait for image animation/carousel transition to occur | Carousel auto-rotates or transitions |
| 10 | Extract the source (src) attribute of the new image | New image source is captured |
| 11 | Compare the initial image source with the new image source | Sources are different (image changed) |
| 12 | If image sources are identical, wait additional time for transition | Extra time given for carousel animation |
| 13 | Extract the source attribute of the subsequent image | New image source is captured |
| 14 | Verify the new image source differs from initial source | Image carousel is working |

#### Validation / Expected Results
- ✓ OUR TEA section navigates successfully
- ✓ Section title "OUR TEA" is displayed
- ✓ Initial image is visible and fully loaded
- ✓ Image carousel transitions automatically
- ✓ New image source differs from initial source
- ✓ Image animation/carousel is functioning correctly
- ✓ Images are properly loaded and rendered
- ✓ Dynamic transition is visible to user

---

### **Test Case 14: Verify Store Page Navigation and Filtering**

| Field | Details |
|-------|---------|
| **Test ID** | KT-TC-004 |
| **Title** | Verify Store Page Navigation and Country-Based Store Filtering |
| **Test Type** | Functional |
| **Priority** | High |
| **Duration** | ~15 seconds |

#### Pre-Conditions
- Koithe main page is loaded (reference TC11)
- Main logo and home title are visible
- Navigation menu is accessible
- STORE section implements country-based filtering
- Network connectivity is available

#### Test Steps

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | From the main page, verify main logo is visible | Logo element is confirmed |
| 2 | Verify home title is visible | Title heading is confirmed |
| 3 | Locate the STORE section link in the navigation menu | Link is visible and clickable |
| 4 | Click the STORE section link | Page navigates to STORE section |
| 5 | Wait for STORE section to load completely | Store page content renders |
| 6 | Verify the STORE section title is visible | "STORE" heading appears on page |
| 7 | Retrieve list of all store names from the page | Store names are extracted |
| 8 | Verify at least one store exists (count > 0) | Stores are present on page |
| 9 | Verify "Aperia Mall" is among the displayed stores | Expected store is found |
| 10 | Log all store names for verification | Stores are displayed in console |
| 11 | Retrieve list of all country names from the filter | Countries are extracted |
| 12 | Verify at least one country exists (count > 0) | Countries are available for filtering |
| 13 | Verify "VIETNAM" is among the country options | Expected country is found |
| 14 | Log all country names for verification | Countries are displayed in console |
| 15 | Click on "VIETNAM" country filter | Filter is applied |
| 16 | Wait for store list to update based on Vietnam filter | Page updates with filtered results |
| 17 | Retrieve list of stores filtered for Vietnam | Vietnam stores are extracted |
| 18 | Verify at least one Vietnam store exists | Vietnam stores are present |
| 19 | Verify "Le Thanh Ton" is among the Vietnam stores | Expected Vietnam store is found |
| 20 | Log all Vietnam stores for verification | Vietnam stores are displayed in console |
| 21 | Verify none of the Vietnam stores appear in the original store list | Filtering works correctly |
| 22 | Calculate intersection between general and Vietnam store lists | Intersection should be empty |
| 23 | Verify intersection is empty (length = 0) | Store lists are properly separated by country |

#### Validation / Expected Results
- ✓ Main page elements are visible
- ✓ STORE section link is accessible
- ✓ STORE section title displays upon navigation
- ✓ Multiple stores are displayed initially
- ✓ "Aperia Mall" is present in store list
- ✓ Multiple countries are available for filtering
- ✓ "VIETNAM" country option is available
- ✓ Clicking Vietnam filter updates the store list
- ✓ Vietnam stores are displayed after filtering
- ✓ "Le Thanh Ton" is present in Vietnam store list
- ✓ Vietnam stores do not overlap with initial store list
- ✓ Filtering mechanism works correctly
- ✓ Store list updates dynamically based on country selection

---

### **Test Case 15: Verify Contact Page Input Fields**

| Field | Details |
|-------|---------|
| **Test ID** | KT-TC-005 |
| **Title** | Verify Contact Form Fields and Submission Validation |
| **Test Type** | Functional |
| **Priority** | High |
| **Duration** | ~15 seconds |

#### Pre-Conditions
- Koithe main page is loaded (reference TC11)
- CONTACT section is accessible via navigation
- Contact form page is available
- Network connectivity is available
- Dropdown options for area and category are populated

#### Test Steps

| Step # | Action | Expected Behavior |
|--------|--------|-------------------|
| 1 | Navigate to the CONTACT section | Contact page loads |
| 2 | Wait for CONTACT section to load completely | Form renders |
| 3 | Verify the CONTACT section title is visible | "CONTACT" heading appears |
| 4 | Verify the Name input field is visible | Name field is displayed |
| 5 | Verify the Area dropdown field is visible | Area dropdown is displayed |
| 6 | Verify the Phone input field is visible | Phone field is displayed |
| 7 | Verify the Category dropdown field is visible | Category dropdown is displayed |
| 8 | Verify the Email input field is visible | Email field is displayed |
| 9 | Verify the Message textarea field is visible | Message field is displayed |
| 10 | Click the Area dropdown to expand options | Dropdown opens |
| 11 | Retrieve list of all area options from the dropdown | Options are extracted |
| 12 | Verify "VIETNAM" is among the area options | Expected option is found |
| 13 | Log all area options for verification | Options are displayed in console |
| 14 | Select "VIETNAM" from the Area dropdown | Option is selected |
| 15 | Verify that "VIETNAM" is now the selected value | Selection is confirmed |
| 16 | Fill the Name field with "Test User" | Name is entered |
| 17 | Fill the Email field with "test@example.com" | Email is entered |
| 18 | Leave the Phone field empty (intentionally skip) | Phone remains blank |
| 19 | Fill the Message field with "This is a test message." | Message is entered |
| 20 | Click the Category dropdown to expand options | Dropdown opens |
| 21 | Select "Business cooperation" from the Category dropdown | Option is selected |
| 22 | Verify that "Business cooperation" is now the selected value | Selection is confirmed |
| 23 | Click the form submit button | Form submission is attempted |
| 24 | Wait for server response or form validation | Form processing occurs |
| 25 | Verify that an error message is displayed | Error message appears |
| 26 | Verify the error message indicates a validation failure | Message explains missing required field |

#### Validation / Expected Results
- ✓ CONTACT section navigates successfully
- ✓ CONTACT section title is displayed
- ✓ All required form fields are visible:
  - Name input field ✓
  - Area dropdown ✓
  - Phone input field ✓
  - Category dropdown ✓
  - Email input field ✓
  - Message textarea ✓
- ✓ Area dropdown contains multiple options including "VIETNAM"
- ✓ "VIETNAM" can be selected from Area dropdown
- ✓ Category dropdown contains "Business cooperation" option
- ✓ "Business cooperation" can be selected from Category dropdown
- ✓ Form accepts valid data in Name, Email, and Message fields
- ✓ Form submission is attempted with incomplete data (Phone is required)
- ✓ Error message is displayed indicating validation failure
- ✓ Error message indicates required field is missing (Phone)
- ✓ Form validation is working correctly
- ✓ User receives feedback on form submission failure

---

## 4. Test Execution Summary

### 4.1 Test Coverage

| Category | Count | Tests |
|----------|-------|-------|
| Positive Functional Tests | 10 | WP-TC-001 to WP-TC-006, KT-TC-001 to KT-TC-004 |
| Negative/Edge Case Tests | 3 | WP-TC-007 to WP-TC-009 |
| Security Tests | 1 | WP-TC-009 |
| Error Handling Tests | 2 | WP-TC-010, KT-TC-005 |
| **Total** | **15** | All test cases |

### 4.2 Test Execution Notes

- **Setup:** All tests use the `beforeEach` hook in Koithe tests to clear cookies
- **Timeouts:** Image loading uses 10,000ms timeout; navigation uses 2,000-3,000ms delays
- **Screenshots:** Error screenshots captured at `test-results/screenshot.png`
- **Execution Time:** Total suite approximately 2-3 minutes
- **Browser:** Chromium (default)
- **Retry Logic:** Negative tests designed to handle failures gracefully

### 4.3 Recommended Execution Order

1. **Smoke Tests First:** WP-TC-001, KT-TC-001 (verify basic page loads)
2. **Core Functionality:** WP-TC-002 to WP-TC-006, KT-TC-002 to KT-TC-004 (main features)
3. **Error Handling:** KT-TC-005 (form validation)
4. **Negative Tests Last:** WP-TC-007 to WP-TC-010 (edge cases and security)

---

## 5. Known Issues & Limitations

- **Language Switching:** Vietnamese language test (TC3) assumes Vietnamese Wikipedia is fully populated with "Hà Nội" article
- **Image Animation:** Test relies on automatic image carousel rotation; timing may vary
- **Store Filtering:** Assumes Vietnam has different stores than global list
- **Login Credentials:** Test account must be pre-created on Wikipedia
- **Network Dependency:** All tests require stable internet connectivity

---

## 6. Maintenance & Future Updates

This test plan should be reviewed and updated when:
- UI elements on tested websites change
- New features or sections are added
- Test data (credentials, search terms) becomes outdated
- Performance requirements change
- Additional test scenarios are identified

---

**Document Prepared By:** QA Automation Team  
**Last Review Date:** March 12, 2026  
**Next Review Date:** April 12, 2026

