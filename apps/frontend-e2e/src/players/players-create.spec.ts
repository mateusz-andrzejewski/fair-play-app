import { test, expect } from '@playwright/test';
import { createPlayerByUI } from './helpers/create-player-by-ui.helper';
import { searchPlayerByUI } from './helpers/search-player-by-ui.helper';
import { createTestPlayer } from './helpers/player.factory';

test('should create player and how him on the list', async({page})=> {
    // Given: start on the players page
    await page.goto('/players');

    // When: click at add player button
    await page.getByTestId('addPlayerButton').click();
    const dialog = page.getByRole('dialog');
    // And: fill the form
    const playerData = await createPlayerByUI(page);

    // And: click at save button
    await dialog.getByTestId('savePlayerButton').click();
    await searchPlayerByUI(page, playerData);
})