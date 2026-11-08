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
  await inventoryPage.clickOnAddToCart(constants.text.backpack);
  await inventoryPage.clickOnAddToCart(constants.text.bolttshirt);
});

test.describe(
  "Verification of products in cart , Deletion of products in cart",
  { tag: ["@cartVerificationAndDeletion", "@all"] },
  async () => {
    test("Cart Product Verification and removal", async ({ page }) => {
      console.log(`Verifying the added items from cart`);
      await cartPage.clickOnCart();
      console.log(`getting all items in the cart`);

      const cartItems: string[] = await cartPage.getCartItem();
      console.log(`Cart items are ${cartItems}`);
      expect(cartItems).toEqual([
        constants.text.backpack,
        constants.text.bolttshirt,
      ]);

      await page.waitForTimeout(2000);
      console.log(`Removing product from cart ${constants.text.bolttshirt}`);
      await cartPage.removeCartItem(constants.text.bolttshirt);

      console.log(
        `Remainig item cart verification for ${constants.text.backpack}`,
      );

      const remainingCartItem = await cartPage.getRemainingCartItem();
      expect(remainingCartItem).toBe(constants.text.backpack);

      console.log(`Verifying of remaining cart count to be equal to ${1}`);

      expect(await cartPage.getCartCount()).toBe(1);
    });
  },
);
