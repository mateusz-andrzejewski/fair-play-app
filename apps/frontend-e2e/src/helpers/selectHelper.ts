import { Page } from "@playwright/test";

export async function selectClickHelper(page: Page, selector: string, keyValueObject: {[key: string]: string | number | boolean }) {
await page.getByTestId(selector).click();

const listbox = page.getByRole('listbox');
await listbox
  .getByRole('option', keyValueObject)
  .click();
}