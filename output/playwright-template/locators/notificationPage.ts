import { Page, Locator } from "@playwright/test";
 
export class Notification {
    readonly page: Page;
 
    // Locators
    readonly notificationBell: Locator
    readonly unreadBadge: Locator
    readonly notificationOverlay: Locator
    readonly mentionsTab: Locator
    readonly assignedTab: Locator
    readonly firstMentionNotification: Locator
    constructor(page: Page) {
        this.page = page
        this.notificationBell = page.locator('button[aria-label="Notifications"][title="Notifications"]')
        this.unreadBadge = page.locator('button[title="Notifications"]>span>span')
        this.notificationOverlay = page
            .locator('div')
            .filter({ hasText: 'Your notifications' })
            .filter({ hasText: 'Mark all as read' })
            .first()
        this.mentionsTab = this.notificationOverlay.getByRole('button', { name: /Mentions \(\d+\)/i })
        this.assignedTab = this.notificationOverlay.getByRole('button', { name: /Assigned \(\d+\)/i })
        this.firstMentionNotification = this.notificationOverlay
            .locator('button')
            .filter({ hasText: 'mentioned you' })
            .first()

    }
}
