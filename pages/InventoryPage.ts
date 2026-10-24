import { Page, Locator } from "@playwright/test";

export class InverntoryPage {
  readonly inventoryItem: Locator;
  readonly shoppingcartbadge: Locator;

  constructor(page: Page) {
    this.inventoryItem = page.locator('[data-test="inventory-item"]');
    this.shoppingcartbadge = page.locator(".shopping_cart_badge");
  }

  async clickOnAddToCart(productname: string) {
    const addToCartButton = this.inventoryItem
      .filter({ hasText: productname })
      .getByRole("button", { name: /Add to cart/i });

    console.log(`adding ${productname} to cart`);
    await addToCartButton.click();
  }

  async getCartCount() {
    const count: number = await this.shoppingcartbadge.count();
    if (count === 0) return 0;
    return parseInt(await this.shoppingcartbadge.innerText(), 10);
  }
}
