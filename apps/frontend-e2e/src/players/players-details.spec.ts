import { expect, test } from "@playwright/test";
import { createPlayerByUI } from "./helpers/create-player-by-ui.helper";
import { searchPlayerByUI } from "./helpers/search-player-by-ui.helper";

test('Should display player details', async({page})=> {
    // GIVEN: created and finded player
    await page.goto('/players');
    await page.getByTestId('addPlayerButton').click();
    const playerData = await createPlayerByUI(page);
    const addPlayerDialog = page.getByRole('dialog');
    await addPlayerDialog.getByTestId('savePlayerButton').click();
    await searchPlayerByUI(page, playerData);
    // WHEN: click details button
    await page.getByTestId('actionsButton').click();
    await page.getByTestId('detailsDropdownButton').click();
    const detailsPlayerDialog = page.getByRole('dialog');
    // THEN: player details are displayed in the details dialog
    detailsPlayerDialog.getByTestId('firstNameDetails').textContent().then(firstName => {
        expect(firstName).toBe(playerData.firstName);
    }),
    detailsPlayerDialog.getByTestId('lastNameDetails').textContent().then(lastName => {
        expect(lastName).toBe(playerData.lastName);
    }),
    detailsPlayerDialog.getByTestId('nicknameDetails').textContent().then(nickname => {
        expect(nickname).toBe(playerData.nickname);
    })

})