import { expect, test } from "@playwright/test";

test("sign up successfully", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Nome do Estabelecimento" })
    .fill("Pizza Shop");

  await page.getByRole("textbox", { name: "Seu nome" }).fill("Diego Schell");

  await page
    .getByRole("textbox", { name: "Seu e-mail" })
    .fill("diego.schell.f@gmail.com");

  await page.getByRole("textbox", { name: "Seu celular" }).fill("123456");

  await page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText("Restaurante cadastrado com sucesso");

  await expect(toast).toBeVisible();

  await page.waitForTimeout(2000);
});

test("sign up with wrong credentials", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page
    .getByRole("textbox", { name: "Nome do Estabelecimento" })
    .fill("Pizza Invalid");

  await page.getByRole("textbox", { name: "Seu nome" }).fill("Diego Schell");

  await page
    .getByRole("textbox", { name: "Seu e-mail" })
    .fill("diego.schell.f@gmail.com");

  await page.getByRole("textbox", { name: "Seu celular" }).fill("123456");

  await page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText("Erro ao cadastrar o restaurante.");

  await expect(toast).toBeVisible();

  await page.waitForTimeout(2000);
});
test("navigate to login page", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByRole("link", { name: "Fazer login" }).click();

  expect(page.url()).toContain("/sign-in");
});
