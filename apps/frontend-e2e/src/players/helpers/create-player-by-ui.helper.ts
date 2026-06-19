import { expect, Page } from "@playwright/test";
import { createTestPlayer } from "./player.factory";

// create player by clicking through the ui
export async function createPlayerByUI(page: Page) {
    const playerData = createTestPlayer(Date.now());
    //Implementation of creating a player through the UI using the playerData object
     await page.goto('/players');
    
        // When: click at add player button
        await page.getByTestId('addPlayerButton').click();
        const dialog = page.getByRole('dialog');
        // And: fill the form
        await dialog.getByTestId('firstNameDialog').fill(playerData.firstName);
        await dialog.getByTestId('lastNameDialog').fill(playerData.lastName);
        await dialog.getByTestId('preferredPositionDialog').click();
        await page.getByRole('option', { name: playerData.preferredPosition }).click();
        await dialog.getByTestId('skillRateDialog').fill(playerData.skillRate);
        await dialog.getByTestId('nicknameDialog').fill(playerData.nickname);
    
        await expect(dialog.getByTestId('firstNameDialog')).toHaveValue(playerData.firstName);
        await expect(dialog.getByTestId('lastNameDialog')).toHaveValue(playerData.lastName);
        await expect(dialog.getByTestId('skillRateDialog')).toHaveValue(playerData.skillRate);
        await expect(dialog.getByTestId('nicknameDialog')).toHaveValue(playerData.nickname);
        await expect(dialog.getByTestId('preferredPositionDialog')).toContainText(playerData.preferredPosition);
    
}