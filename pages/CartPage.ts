import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly cartIcon: Locator;
  readonly shoppingCartBadge: Locator;
  readonly cartItemsList: Locator;
  readonly allCartItems: Locator;
  readonly cartItemRemove: Locator;
  readonly remainingCartItem: Locator;

  constructor(page: Page) {
    this.cartIcon = page.locator("[data-test='shopping-cart-link']");
    this.shoppingCartBadge = page.locator(".shopping_cart_badge");
    this.cartItemsList = page.locator("[data-test='cart-list']");
    this.allCartItems = this.cartItemsList.locator(
      "[data-test='inventory-item-name']",
    );
    this.cartItemRemove = this.cartItemsList.locator(
      "[data-test='inventory-item']",
    );
    this.remainingCartItem = this.allCartItems;
  }

  async clickOnCart() {
    console.log(`Clicking on cart icon`);
    await this.cartIcon.click();
    await this.cartItemsList.waitFor({ state: "visible" });
  }

  async getCartItem() {
    return await this.allCartItems.allInnerTexts();
  }

  async removeCartItem(productname: string) {
    const itemToBeRemoved = this.cartItemRemove.filter({
      hasText: productname,
    });
    await itemToBeRemoved.locator("button[data-test^='remove-']").click();
  }

  async getRemainingCartItem() {
    return await this.remainingCartItem.innerText();
  }

  async getCartCount() {
    const count = await this.shoppingCartBadge.count();
    if (count === 0) return 0;
    return parseInt(await this.shoppingCartBadge.innerText(), 10);
  }
}
