import { expect, test } from "@playwright/test";

async function resetPage(page: import("@playwright/test").Page) {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const trigger = page.getByTestId("car-picker-trigger");
  if ((await trigger.count()) > 0) {
    await trigger.click();
    await page.getByRole("heading", { name: "Your cars" }).waitFor();
    while ((await page.getByTestId("car-row").count()) > 0) {
      await page.getByTestId("car-row").first().getByTitle("Delete car").click();
      await page.waitForTimeout(300);
    }
  }
  await expect(page.getByRole("button", { name: "Add your first car" })).toBeVisible({ timeout: 5000 });
}

test("user can add a car and edit its identifier", async ({ page }) => {
  const identifier = `E2E car ${Date.now()}`;
  await resetPage(page);

  await page.getByRole("button", { name: "Add your first car" }).click();
  await page.getByLabel("How do you identify this car?").fill(identifier);
  await page.getByRole("button", { name: "Add car" }).click();
  await expect(page.getByRole("heading", { name: identifier })).toBeVisible();

  await page.getByTestId("car-picker-trigger").click();
  await page.getByTestId("car-row").filter({ hasText: identifier }).getByTitle("Edit car").click();
  await page.getByLabel("How do you identify this car?").fill(`${identifier} updated`);
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("heading", { name: `${identifier} updated` })).toBeVisible();
});

test("user can delete one submission without deleting the car", async ({ page }) => {
  const identifier = `E2E history ${Date.now()}`;
  page.on("dialog", (dialog) => dialog.accept());
  await resetPage(page);

  await page.getByRole("button", { name: "Add your first car" }).click();
  await page.getByLabel("How do you identify this car?").fill(identifier);
  await page.getByRole("button", { name: "Add car" }).click();
  await expect(page.getByRole("heading", { name: identifier })).toBeVisible();

  await page.getByRole("button", { name: /add/i }).first().click();
  await page.getByLabel("Submission date").fill("2026-01-01");
  await page.getByLabel("Odometer reading (km)").fill("10000");
  await page.getByRole("button", { name: "Save reading" }).click();
  await expect(page.getByText("10,000 km")).toBeVisible();

  await page.getByRole("button", { name: "Delete submission" }).click();
  await expect(page.getByText("No readings yet.")).toBeVisible();
  await expect(page.getByRole("heading", { name: identifier })).toBeVisible();
});
