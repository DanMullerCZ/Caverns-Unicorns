import { test, expect } from '@playwright/test';

test('Initial home page title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('D&D')
});

test('Login form with start at homepage', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', { name: 'Log In' }).click();

  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('daniel.muller1918@seznam.cz');

  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('123456');

  await page.getByRole('button', { name: 'Login with credentials' }).click();

  await expect(page.getByText('Logged in as Dan')).toHaveText('Logged in as Dan')
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

  await expect(page.getByTestId('response')).toHaveText('error')
});


// test.setTimeout(35e3);

// test('send message', async ({ browser, page }) => {
//   const viewer = await browser.newPage();
//   await viewer.goto('/');
//   await page.goto('/api/auth/signin');
//   await page.type('[name="name"]', 'test');
//   await page.click('[type="submit"]');
//   const nonce =
//     Math.random()
//       .toString(36)
//       .replace(/[^a-z]+/g, '')
//       .slice(0, 6) || 'nonce';
//   // await page.click('[type=submit]');
//   await page.type('[name=text]', nonce);
//   await page.click('[type=submit]');
//   await viewer.waitForSelector(`text=${nonce}`);
//   viewer.close();
// });

export {};
