import { expect, Page } from "@playwright/test";
import { TestPlayerData } from "./player.factory";

export async function searchPlayerByUI(page: Page, playerData: TestPlayerData) {
// search specific player by clicking through the ui
//go to page
await page.goto('/players');

//click the each of filters and fill it by passed values
page.getByTestId('firstNameFilter').fill(playerData.firstName);
page.getByTestId('lastNameFilter').fill(playerData.lastName);
page.getByTestId('preferredPositionFilter').selectOption(playerData.preferredPosition);
page.pause();
//click the search button

//click reset button to clear the filters

//assert that the right player is displayed in the table by using players-table-helper
}