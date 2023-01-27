import { test, expect } from '@playwright/test';

test('registration ', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('test@test.cz');
  await page.locator('input[name="name"]').click();
  await page.locator('input[name="name"]').fill('Test');
  await page.locator('input[name="password1"]').click();
  await page.locator('input[name="password1"]').fill('1234');
  await page.locator('input[name="password2"]').click();
  await page.locator('input[name="password2"]').fill('1234');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByTestId('login-message')).toBe(
    'Successfully registered. Now you can login',
  );
});

test('log-in', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('test@test.cz');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill('1234');
  await page.getByRole('button', { name: 'Login with Credentials' }).click();
  await expect(page.getByTestId('succes login')).toBe('USERS PAGE');
});

test('open user endpoint without being loged, login , changing password', async ({
  page,
}) => {
  await page.goto('/');
  await page.goto('/user');
  await page.getByRole('link', { name: 'LOG IN' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('test@test.cz');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill('test');
  await page.getByRole('button', { name: 'Login with Credentials' }).click();
  await page.getByPlaceholder('current password').click();
  await page.getByPlaceholder('current password').fill('test');
  await page.getByPlaceholder('current password').press('Tab');
  await page.getByPlaceholder('new password').first().fill('1234');
  await page.getByPlaceholder('new password').first().press('Tab');
  await page.getByPlaceholder(' confirm new password').fill('1234');
  await page.getByRole('button', { name: 'change password' }).click();
  await expect(page.getByTestId('success')).toHaveText(
    'Succesfully changed password',
  );
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(
    `Finished ${testInfo.title} => Test ${testInfo.status?.toUpperCase()}`,
  );

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up because ${testInfo.error}`);
});

test.afterAll(async ({ request }) => {
  console.log(
    `Finished all userSettings tests => Deleting Test Unit from database`,
  );

  await request.post('/api/admin/testing', {
    data: {
      user: 'Admin',
      password: 'veryComplicatedPasswordAndHardToHack',
    },
  });
});
