import { expect, test } from "@playwright/test";
import { createPlayerByUI } from "./helpers/create-player-by-ui.helper";
import { searchPlayerByUI } from "./helpers/search-player-by-ui.helper";
test('Should delete player', async({page})=> {
// GIVEN: created and finded player
    await page.goto('/players');
    await page.getByTestId('addPlayerButton').click();
    const addPlayerDialog = page.getByRole('dialog');
    const playerData = await createPlayerByUI(page);
    await addPlayerDialog.getByTestId('savePlayerButton').click();
    await searchPlayerByUI(page, playerData);
// WHEN: click delete button
    await page.getByTestId('actionsButton').click();
    await page.getByTestId('deleteDropdownButton').click();
    const confirmDeleteDialog = page.getByRole('dialog');
// THEN: player is deleted after clicking confirm button
    await Promise.all([
        page.waitForResponse(response =>
            response.url().includes('/api/players') &&
            response.request().method() === 'DELETE' && 
            response.ok()
        ),
        confirmDeleteDialog.getByTestId('confirmDeleteButton').click()
    ])
})