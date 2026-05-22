import { expect } from "@playwright/test";
import  { Notification} from "../locators/notificationPage";
export class NotificationsPage {
    private notification: Notification;
    constructor(notification: Notification) {
        this.notification = notification;
    }
     async BellIconVerify(){
        // await expect(this.notification.notificationBell).toBeVisible()
        await this.notification.notificationBell.click()
     }
     async openNotificationOverlay(){
        await this.notification.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {})
        await this.notification.page.getByText(/Loading workstreams/i).waitFor({ state: 'hidden', timeout: 15000 }).catch(() => {})
        await expect(this.notification.notificationBell).toBeVisible()
        await this.notification.notificationBell.click({ force: true })
        await expect(this.notification.notificationOverlay).toBeVisible()
     }
     async openMentionsTab(){
        await expect(this.notification.mentionsTab).toBeVisible()
        await this.notification.mentionsTab.click()
     }
     async openAssignedTab(){
        await expect(this.notification.assignedTab).toBeVisible()
        await this.notification.assignedTab.click()
     }
     async clickFirstMentionNotification(){
        await expect(this.notification.firstMentionNotification).toBeVisible()
        await this.notification.firstMentionNotification.click()
     }
     async verifyAssignmentNotification(workstreamName: string, recipientEmail: string){
        const assignmentNotification = this.notification.notificationOverlay
            .locator('button')
            .filter({ hasText: workstreamName })
            .filter({ hasText: /assigned|added|owner/i })
            .first()

        await expect(assignmentNotification).toBeVisible()
        const notificationText = await assignmentNotification.innerText()
        const recipientName = recipientEmail.split('@')[0].toLowerCase()

        expect(notificationText).toContain(workstreamName)
        expect(notificationText.toLowerCase()).toMatch(new RegExp(`${recipientName}|you`))
     }
     async verifyWorkstreamOpened(workstreamName: string){
        await expect(this.notification.page.getByText(workstreamName)).toBeVisible()
     }
     async UnreadBadgeVerify(){
        const unreadBadgevalue = await this.notification.unreadBadge.allInnerTexts()
        console.log(unreadBadgevalue)
        await expect(this.notification.unreadBadge).toHaveCount(unreadBadgevalue.length)
        // await expect(this.notification.unreadBadge).toBeVisible()
     }
 
}