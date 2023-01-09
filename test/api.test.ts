import { test, expect } from '@playwright/test';
import Image from 'next/image';

test('GET /classes/monk, return class description', async ({ page }) => {
    await page.goto('/classes/monk');
    await expect(page.getByTestId('class_details')).toHaveText(`A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.`
    );  
    await expect(page).toHaveTitle('Monk');
})

test('GET /character-creation',async ({page})=>{
    await page.goto('/character-creation')
    await expect(page).toHaveTitle('Create new hero')
    await expect(page.getByTestId('creation-container')).toBeDefined
    await expect(page.getByTestId('class-selection')).toBeUndefined
    await expect(page.getByTestId('race-selection')).toBeDefined

})