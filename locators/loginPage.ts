import { Page, Locator } from "@playwright/test";
 
export class LoginPage {
    readonly page: Page;
 
    // Locators
    readonly headerVerification: Locator
    readonly logoVerification: Locator
    readonly emailInput: Locator;
     readonly PasswordInput: Locator;
     readonly continueBtn: Locator;
    constructor(page: Page) {
        this.page = page
        this.logoVerification = page.locator('header[id="screen-header"]>img')
        this.headerVerification = page.locator('header[id="screen-header"]>h1')
        this.emailInput = page.locator('input[id="username"]');
        this.PasswordInput = page.locator('input[id="password"]');
        this.continueBtn = page.getByText('Continue')
 
    }
}