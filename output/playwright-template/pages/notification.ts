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
     async UnreadBadgeVerify(){
        const unreadBadgevalue = await this.notification.unreadBadge.allInnerTexts()
        console.log(unreadBadgevalue)
        await expect(this.notification.unreadBadge).toHaveCount(unreadBadgevalue.length)
        // await expect(this.notification.unreadBadge).toBeVisible()
     }
 
}