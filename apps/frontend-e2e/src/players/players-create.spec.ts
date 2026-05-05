import { test, expect } from '@playwright/test';

test('should create player and how him on the list', async({page})=> {
    const uniqueId = Date.now();
    const firstName = `Jan${uniqueId}`;
    const lastName = `Kowalski${uniqueId}`;
    // Given: start on the players page
    await page.goto('/players');

    // When: click at add player button
    await page.getByTestId('addPlayerButton').click();
    const dialog = page.getByRole('dialog');;
    // And: fill the form
    await dialog.getByTestId('firstNameDialog').fill(firstName);
    await dialog.getByTestId('lastNameDialog').fill(lastName);
    await dialog.getByRole('option', { name: 'Pomocnik' }).click();
    await dialog.getByTestId('skillRateDialog').fill('5');
    await dialog.getByTestId('nicknameDialog').fill(`JK${uniqueId}`);
})