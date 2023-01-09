import { test, expect } from '@playwright/test';

// It is imposibble to test specific trpc procedures on backend, 
// if you want to test something it must go through frontend

test('Login form with start at homepage', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', { name: 'Log In' }).click();

  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('daniel.muller1918@seznam.cz');

  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('123456');

  await page.getByRole('button', { name: 'Login with credentials' }).click();

  await expect(page.getByText('Logged in as Dan')).toHaveText(
    'Logged in as Dan',
  );
});

test('Registration with already used email', async ({ page }) => {
  await page.goto('http://localhost:3000/register');

  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('daniel.muller1918@seznam.cz');

  await page.locator('input[name="name"]').click();
  await page.locator('input[name="name"]').fill('Dan');

  await page.locator('input[name="password1"]').click();
  await page.locator('input[name="password1"]').fill('123456');

  await page.locator('input[name="password2"]').click();
  await page.locator('input[name="password2"]').fill('123456');

  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByTestId('response')).toHaveText('error');
});

///////////////////////////////////////////
// email must not be verified!!!!!!!!!!!!!!
///////////////////////////////////////////

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} => ${testInfo.status?.toUpperCase()}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

test.afterAll(async () => {
  // delete test user 
});

export {};
