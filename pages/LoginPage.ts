/// <reference types="node"/>
import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly baseUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.getByPlaceholder("Username");
    this.passwordField = page.getByPlaceholder("Password");
    this.loginButton = page.locator("#login-button");
    const baseUrl = process.env.BASE_URL;
    if (!baseUrl) {
      throw new Error("BASE_URL is not set. Add it to the .env file.");
    }
    this.baseUrl = baseUrl;
  }

  async openPage() {
    console.log(`Opening the baseUrl ${this.baseUrl}`);
    await this.page.goto(this.baseUrl);
  }

  async enterUserName(username: string) {
    console.log(`Entering Username ${username}`);
    await this.usernameField.fill(username);
  }

  async enterPassword(password: string) {
    console.log(`Entering Password ${password}`);
    await this.passwordField.fill(password);
  }

  async pressLoginButton() {
    console.log("Pressing login button");
    await this.loginButton.click();
  }
}
