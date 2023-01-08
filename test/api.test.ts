import { test, expect } from '@playwright/test';

// It is imposibble to test specific trpc procedures on backend, 
// if you want to test something it must go through frontend


// RACES

test('GET /races, returns all races', async ({ page }) => {
    await page.goto('/races');
    await expect(page.getByTestId('race')).toHaveCount(9); 
});

test('GET /races/human, returns correct human stats', async ({ page }) => {
    await page.goto('/races/human');
    await expect(page.getByTestId('race_detail_status')).toHaveText('Data status: success'); 
    await expect(page.getByTestId('race_detail')).toHaveText(`
        {
             "name": "Human",
             "id": 14,
             "description": "Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.",
             "dex": 1,
             "str": 1,
             "con": 1,
             "int": 1,
             "wis": 1,
             "char": 0
        }`
    );    
});

test('GET /races/john, error handling on non-existent race', async ({ page }) => {
    await page.goto('/races/john');
    await expect(page.getByTestId('race_detail_status')).toHaveText('Data status: success'); 
    await expect(page.getByTestId('race_detail')).toHaveText('No such race in Caverns & Unicorns');    
});

// CLASSES

test('GET /classes, returns all classes', async ({ page }) => {
    await page.goto('/classes');
    await expect(page.getByTestId('class')).toHaveCount(12); 
});

test('GET /classes/monk, return class stats', async ({ page }) => {
    // waits for specific page to be made
})

test('GET /classes/mentor, error handling on non-existent race', async ({ page }) => {
    await page.goto('/classes/mentor');
    await expect(page.getByText('404 - Page Not Found')).toBeVisible()
});

// MISC

test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} => ${testInfo.status?.toUpperCase()}`);
  
    if (testInfo.status !== testInfo.expectedStatus)
      console.log(`Did not run as expected, ended up at ${page.url()}`);
});