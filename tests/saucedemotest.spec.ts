import { test, expect } from "@playwright/test";
import { users } from "../data/users";
import { LoginPage } from "../pages/LoginPage";

let loginPage: LoginPage;

test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.openPage();
});

test.describe("Login test", { tag: ["@smoke"] }, async () => {
  test(
    "Logging in with valid username and password",
    { tag: ["@valid"] },
    async () => {
      await loginPage.enterUserName(users.standard.username);
      await loginPage.enterPassword(users.standard.password);
      await loginPage.pressLoginButton();
    },
  );
});
