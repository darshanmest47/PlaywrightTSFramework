import { test, expect } from "@playwright/test";
import { users } from "../data/users";
import { LoginPage } from "../pages/LoginPage";
import { InverntoryPage } from "../pages/InventoryPage";
import { constants } from "../data/constants";
import { CartPage } from "../pages/CartPage";

let loginPage: LoginPage;
let inventoryPage: InverntoryPage;
let cartPage: CartPage;

test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  inventoryPage = new InverntoryPage(page);
  cartPage = new CartPage(page);

  await loginPage.openPage();
  await loginPage.enterUserName(users.standard.username);
  await loginPage.enterPassword(users.standard.password);
  await loginPage.pressLoginButton();
});

test.describe(
  "Verification of cart Items",
  { tag: ["@addtoproducts", "@all"] },
  async () => {
    test("Verification of add to products", async () => {
      await inventoryPage.clickOnAddToCart(constants.text.backpack);
      await inventoryPage.clickOnAddToCart(constants.text.bolttshirt);
      const count = await inventoryPage.getCartCount();
      console.log(`cart count is ${count}`);
    });
  },
);
