import { Page, Locator } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;
  readonly productsCards: Locator;
  readonly secondPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsCards = page.locator(
      "#card-list .search-item-card-wrapper-gallery",
    );
    this.secondPage = page.locator(".comet-pagination .comet-pagination-item-2");
  }

  async navigateToSecondPage() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.secondPage.waitFor({ state: "visible", timeout: 10000 });
    await this.secondPage.click();
  }

  async getProductsCount() {
    await this.productsCards.first().waitFor({ state: "visible" });
    return await this.productsCards.count();
  }

  getProductCard(index: number) {
    return this.productsCards.nth(index);
  }
}
