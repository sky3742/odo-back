import { expect, test } from "@playwright/test";

test("user can add a car and edit its identifier", async ({ page }) => {
  const identifier = `E2E car ${Date.now()}`;
  await page.goto("/");
  const firstButton = page.getByRole("button", { name: "Add your first car" });
  if (await firstButton.count()) await firstButton.click();
  else await page.getByRole("button", { name: "Add car" }).click();
  await page.getByLabel("How do you identify this car?").fill(identifier);
  await page.getByRole("button", { name: "Add car" }).click();
  await expect(page.getByRole("button", { name: identifier })).toBeVisible();
  await page.getByTestId("car-row").filter({ hasText: identifier }).getByRole("button", { name: "Edit car" }).click();
  await page.getByLabel("How do you identify this car?").fill(`${identifier} updated`);
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("heading", { name: `${identifier} updated` })).toBeVisible();
});

test("user can delete one submission without deleting the car", async ({ page }) => {
  const identifier = `E2E history ${Date.now()}`;
  page.on("dialog", (dialog) => dialog.accept());
  await page.goto("/");
  const addCarButton = page.getByRole("button", { name: "Add car" });
  if (await addCarButton.count()) await addCarButton.first().click();
  else await page.getByRole("button", { name: "Add your first car" }).click();
  await page.getByLabel("How do you identify this car?").fill(identifier);
  await page.getByRole("button", { name: "Add car" }).click();
  await page.getByRole("button", { name: "Add reading" }).click();
  await page.getByLabel("Submission date").fill("2026-01-01");
  await page.getByLabel("Odometer reading (km)").fill("10000");
  await page.getByRole("button", { name: "Save reading" }).click();
  await expect(page.getByText("10,000 km")).toBeVisible();
  await page.getByRole("button", { name: "Delete submission" }).click();
  await expect(page.getByText("No readings yet.")).toBeVisible();
  await expect(page.getByRole("heading", { name: identifier })).toBeVisible();
});
