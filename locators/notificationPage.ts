import { Page, Locator } from "@playwright/test";
 
export class Notification {
    readonly page: Page;
 
    // Locators
    readonly notificationBell: Locator
    readonly unreadBadge: Locator
    constructor(page: Page) {
        this.page = page
        this.notificationBell = page.locator("span[class='relative inline-flex'] svg")
        this.unreadBadge = page.locator('button[title="Notifications"]>span>span')

    }
}