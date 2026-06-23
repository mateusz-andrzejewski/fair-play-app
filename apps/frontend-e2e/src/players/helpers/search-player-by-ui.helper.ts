import { expect, Page } from "@playwright/test";
import { TestPlayerData } from "./player.factory";
import { selectClickHelper } from "../../helpers/selectHelper";

export async function searchPlayerByUI(page: Page, playerData: TestPlayerData) {
// GIVEN:
// search specific player by clicking through the ui
//go to page
await page.goto('/players');

//WHEN:
//click the each of filters and fill it by passed values
await page.getByTestId('firstNameFilter').fill(playerData.firstName);
await page.getByTestId('lastNameFilter').fill(playerData.lastName);
await selectClickHelper(page, 'preferredPositionFilter', { name: playerData.preferredPosition });

//AND:
//click the search button
await page.getByTestId('searchButton').click();

//THEN:
//assert that the right player is displayed in the table by using players-table-helper
await Promise.all([
        page.waitForResponse(response =>
            response.url().includes('/api/players') &&
            response.request().method() === 'GET' && 
            response.ok()
    ),
    page.getByTestId('searchButton').click(),
])

await expect(page.getByTestId('firstNameCell')).toHaveText(playerData.firstName);
await expect(page.getByTestId('lastNameCell')).toHaveText(playerData.lastName);
await expect(page.getByTestId('nicknameCell')).toHaveText(playerData.nickname);
await expect(page.getByTestId('skillRateCell')).toHaveText(playerData.skillRate.toString());
}