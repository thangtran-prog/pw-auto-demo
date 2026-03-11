import {test, expect, Locator} from '@playwright/test';
const mainPage = 'https://testautomationpractice.blogspot.com/';

test('Single select dropdown', async ({page}) => {
    // Navigate to the main page
    await page.goto(mainPage);
    // Select options from the dropdown using different methods
    await page.locator('#searchLanguage').selectOption('Vietnamese'); //using visible text
    await page.locator('#searchLanguage').selectOption({value: 'vi'}); //using value attribute
    await page.locator('#searchLanguage').selectOption({label: 'Vietnamese'}); //using label
    await page.locator('#searchLanguage').selectOption({index: 1}); //using index

    await page.waitForTimeout(2000);
    // Check number of options in the dropdown
    const options: Locator = page.locator('#searchLanguage>option');
    console.log(`Number of options in the dropdown: ${await options.count()}`);
    await expect(options).toHaveCount(10);

    // Check an option present in the dropdown
    const optionsContent: string[] = (await options.allTextContents()).map(text => text.trim());
    console.log(`Options in the dropdown: ${optionsContent}`);
    expect(optionsContent).toContain('Vietnamese');

    // Loop through options list
    for (let opt of optionsContent) {
        console.log(`Option in the dropdown: ${opt}`);
    }
});

test('Multiple select dropdown', async ({page}) => {
    // Navigate to the main page
    await page.goto(mainPage);
    // Select options from the dropdown using different methods
    await page.locator('#colors').selectOption(['Red', 'Green', 'Blue']);
    await page.locator('#colors').selectOption(['red', 'green', 'blue']);
    await page.locator('#colors').selectOption([{label: 'Red'}, {label: 'Green'}, {label: 'Blue'}]);
    await page.locator('#colors').selectOption([{index: 1}, {index: 2}, {index: 3}]);

    await page.waitForTimeout(2000);
    // Check number of options in the dropdown
    const options: Locator = page.locator('#colors>option');
    console.log(`Number of options in the dropdown: ${await options.count()}`);
    await expect(options).toHaveCount(3);
    // Check the selected options
    const optionContents: string[] = (await options.allTextContents()).map(text => text.trim());
    console.log(`Options in the dropdown: ${optionContents}`);
    // expect(optionContents).toEqual(['Red', 'Green', 'Blue']);
    
    // verify sorted order of options
    const originalOptions: string[] = [...optionContents]; // spread operator to create a copy of the original array
    const sortedOptions: string[] = [...optionContents].sort();
    console.log(`Original options: ${originalOptions}`);
    console.log(`Sorted options: ${sortedOptions}`);
    expect(originalOptions).toEqual(sortedOptions);

});

test('Verify duplicate options in dropdown', async ({page}) => {
    // Navigate to the main page
    await page.goto(mainPage);
    const options: Locator = page.locator('#colors>option');
    console.log(`Number of options in the dropdown: ${await options.count()}`);
    const optionContents: string[] = (await options.allTextContents()).map(text => text.trim());
    console.log(`Options in the dropdown: ${optionContents}`);

    const myset = new Set<string>(); // Create a Set to store unique options (dupplicate value not allowed)
    const duplicateOptions: string[] = []; // Create an array to store duplicate options
    
    for (let opt of optionContents) {
        if (myset.has(opt)) {
            duplicateOptions.push(opt); // If the option is already in the Set, it's a duplicate
        } else {
            myset.add(opt); // If the option is not in the Set, add it to the Set
        }
    }

    if (duplicateOptions.length > 0) {
        console.error(`Duplicate options in the dropdown: ${duplicateOptions}`);
    } else {
        console.log('No duplicate options in the dropdown');
    }

    expect(duplicateOptions).toEqual([]); // Expect no duplicate options
    expect(duplicateOptions.length).toBe(0); // Expect the length of duplicate options to be 0

});