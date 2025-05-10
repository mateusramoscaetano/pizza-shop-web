import { expect, test } from "@playwright/test";

test("sign in successfully", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Seu e-mail" })
    .fill("diego.schell.f@gmail.com");

  await page.getByRole("button", { name: "Acessar Painel" }).click();

  const toast = page.getByText(
    "Enviamos um link de autenticação no seu e-mail."
  );

  await expect(toast).toBeVisible();

  await page.waitForTimeout(2000);
});
test("sign with wrong credentials", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Seu e-mail" })
    .fill("diego-error.f@gmail.com");

  await page.getByRole("button", { name: "Acessar Painel" }).click();

  const toast = page.getByText("Credenciais inválidas.");

  await expect(toast).toBeVisible();

  await page.waitForTimeout(2000);
});
test("navigate to new restaurant page", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Novo estabelecimento" }).click();

  expect(page.url()).toContain("/sign-up");
});
