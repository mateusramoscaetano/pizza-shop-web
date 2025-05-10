import { expect, test } from "@playwright/test";

test("sign up successfully", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Pizzaria do João" }).click();

  await page.getByRole("menuitem", { name: "Perfil da loja" }).click();

  await page.getByRole("textbox", { name: "Nome" }).fill("Rocket Pizza");

  await page
    .getByRole("textbox", { name: "Descrição" })
    .fill("alguma descrição");

  await page.getByRole("button", { name: "Salvar" }).click();

  await page.waitForLoadState("networkidle");

  const toast = page.getByText("Perfil atualizado com sucesso.");

  await expect(toast).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Rocket Pizza" })
  ).toBeVisible();
});
