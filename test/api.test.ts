import { test, expect } from '@playwright/test';
// import { deleteTestUser } from './functions';

// It is imposibble to test specific trpc procedures on backend, 
// if you want to test something it must go through frontend

// RACES

test('GET /races, returns all races', async ({ page }) => {
    await page.goto('/races');
    await expect(page.getByTestId('race')).toHaveCount(8); 
});

test('GET /races/human, returns correct human stats', async ({ page }) => {
    await page.goto('/races/human'); 
    await expect(page.getByTestId('race_details')).toHaveText('Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.'
    );    
});

test('GET /races/john, error handling on non-existent race', async ({ page }) => {
    await page.goto('/races/john');  
    await expect(page).toHaveTitle('404 - Page Not Found')
});

// CLASSES

test('GET /classes, returns all classes', async ({ page }) => {
    await page.goto('/classes');
    await expect(page.getByTestId('class')).toHaveCount(12); 
});

test('GET /classes/monk, return class description', async ({ page }) => {
    await page.goto('/classes/monk');
    await expect(page.getByTestId('class_details')).toHaveText(`A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection`
    );  
    await expect(page).toHaveTitle('monk');
})

test('GET /classes/mentor, error handling on non-existent race', async ({ page }) => {
    await page.goto('/classes/mentor');
    await expect(page).toHaveTitle('404 - Page Not Found')
});


test('GET /character-creation',async ({page})=>{
    await page.goto('/character-creation')
    await expect(page).toHaveTitle('Create new hero')
    await expect(page.getByTestId('creation-container')).toBeDefined
    await expect(page.getByTestId('class-selection')).toBeUndefined
    await expect(page.getByTestId('race-selection')).toBeDefined
    
})

// MISC

test.afterEach(async ({ page }, testInfo) => {
    console.log(`Finished ${testInfo.title} => ${testInfo.status?.toUpperCase()}`);
  
    if (testInfo.status !== testInfo.expectedStatus)
      console.log(`Did not run as expected, ended up at ${page.url()}`);
});
