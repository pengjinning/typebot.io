import { getTestAsset } from "@/test/utils/playwright";
import { createId } from "@paralleldrive/cuid2";
import test, { expect } from "@playwright/test";
import { importTypebotInDatabase } from "@typebot.io/playwright/databaseActions";

const typebotId = createId();

test.describe("Wait block", () => {
  test("wait should trigger", async ({ page }) => {
    await importTypebotInDatabase(getTestAsset("typebots/logic/wait.json"), {
      id: typebotId,
    });

    await page.goto(`/typebots/${typebotId}/edit`);
    await page.click("text=Configure...");
    await page.getByRole("textbox", { name: "Seconds to wait for:" }).fill("3");

    await page.click("text=Test");
    await page.getByRole("button", { name: "Wait now" }).click();
    await page.waitForTimeout(1000);
    await expect(
      page.locator("typebot-standard").locator('text="Hi there!"'),
    ).toBeHidden();
    await page.waitForTimeout(9010);
    await expect(
      page.locator("typebot-standard").locator('text="Hi there!"'),
    ).toBeVisible();
  });
});
