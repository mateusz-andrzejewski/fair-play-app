import { test } from '@playwright/test';
import { createPlayerByUI } from './helpers/create-player-by-ui.helper';
import { searchPlayerByUI } from './helpers/search-player-by-ui.helper';

test('should create player', async({page})=> {
    // Given: start on the players page
    await page.goto('/players');

    // When: click at add player button
    await page.getByTestId('addPlayerButton').click();
    const dialog = page.getByRole('dialog');
    // And: fill the form
    const playerData = await createPlayerByUI(page);

    // And: click at save button
    await dialog.getByTestId('savePlayerButton').click();

    // Then: find a player at the list
    await searchPlayerByUI(page, playerData);
})