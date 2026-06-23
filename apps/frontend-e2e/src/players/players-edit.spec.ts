import { test } from "@playwright/test";
import { selectClickHelper } from "../helpers/selectHelper";
import { createPlayerByUI } from "./helpers/create-player-by-ui.helper";
import { createTestPlayer } from "./helpers/player.factory";
import { searchPlayerByUI } from "./helpers/search-player-by-ui.helper";
test('Should edit player', async({page})=> {
// GIVEN: created and finded player
    await page.goto('/players');
    await page.getByTestId('addPlayerButton').click();
    const addPlayerDialog = page.getByRole('dialog');
    const playerData = await createPlayerByUI(page);
    await addPlayerDialog.getByTestId('savePlayerButton').click();
    await searchPlayerByUI(page, playerData);
// WHEN: click edit button
    await page.getByTestId('actionsButton').click();
    await page.getByTestId('editDropdownButton').click();
    const editPlayerDialog = page.getByRole('dialog');;
// AND: fill the form with new data
    const newPlayerData = createTestPlayer(new Date().getTime());
    await editPlayerDialog.getByTestId('firstNameDialog').fill(newPlayerData.firstName);
    await editPlayerDialog.getByTestId('lastNameDialog').fill(newPlayerData.lastName);
    await editPlayerDialog.getByTestId('nicknameDialog').fill(newPlayerData.nickname);
    await editPlayerDialog.getByTestId('skillRateDialog').fill(newPlayerData.skillRate.toString());
    await selectClickHelper(page, 'preferredPositionDialog', {name: newPlayerData.preferredPosition});
    await page.getByRole('option', { name: newPlayerData.preferredPosition }).click();
// AND: click save button
// THEN: player details are displayed in the edit dialog
    await Promise.all([
        page.waitForResponse(response =>
            response.url().includes('/api/players') &&
            response.request().method() === 'PATCH' && 
            response.ok()
        ),
        editPlayerDialog.getByTestId('savePlayerButton').click()
    ])
    await page.getByTestId('clearFilters').click();
    await searchPlayerByUI(page, newPlayerData);
})