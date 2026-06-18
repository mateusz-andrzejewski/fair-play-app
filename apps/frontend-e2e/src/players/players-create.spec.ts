import { test, expect } from '@playwright/test';

test('should create player and how him on the list', async({page})=> {
    const uniqueId = Date.now();
    const firstName = `Jan${uniqueId}`;
    const lastName = `Kowalski${uniqueId}`;
    // Given: start on the players page
    await page.goto('/players');

    // When: click at add player button
    await page.getByTestId('addPlayerButton').click();
    const dialog = page.getByRole('dialog');
    // And: fill the form
    await dialog.getByTestId('firstNameDialog').fill(firstName);
    await dialog.getByTestId('lastNameDialog').fill(lastName);
    await dialog.getByTestId('preferredPositionDialog').click();
    await page.getByRole('option', { name: 'Napastnik' }).click();
    await dialog.getByTestId('skillRateDialog').fill('6');
    await dialog.getByTestId('nicknameDialog').fill(`JK${uniqueId}`);

    await expect(dialog.getByTestId('firstNameDialog')).toHaveValue(firstName);
    await expect(dialog.getByTestId('lastNameDialog')).toHaveValue(lastName);
    await expect(dialog.getByTestId('skillRateDialog')).toHaveValue('6');
    await expect(dialog.getByTestId('nicknameDialog')).toHaveValue(`JK${uniqueId}`);
    await expect(dialog.getByTestId('preferredPositionDialog')).toContainText('Napastnik');

    // And: click at save button
    await dialog.getByTestId('savePlayerButton').click();
})