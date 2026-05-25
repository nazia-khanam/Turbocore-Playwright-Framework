import { test } from "@playwright/test"
import { LoginData } from "../data/loginData"
import { LoginPage } from "../locators/loginPage"
import { Notification } from "../locators/notificationPage"
import { TurboLogin } from "../pages/turboLogin"
import { NotificationsPage } from "../pages/notification"

test.describe("Mention Notification Navigation", () => {
    test("TC_NOTIF_012 - clicking mention notification opens exact mentioned message", async ({ browser }) => {
        const context = await browser.newContext({ permissions: ['notifications'] })
        const page = await context.newPage()

        const recipientEmail = LoginData.Email1
        const recipientPassword = LoginData.password1
        const workstreamName = "Notifications testing"

        const loginPage = new TurboLogin(new LoginPage(page))
        const notificationsPage = new NotificationsPage(new Notification(page))

        // Step 1: Log in as recipient.
        await loginPage.navigateToLogin()
        await loginPage.emailFill(recipientEmail)
        await loginPage.PasswordFill(recipientPassword)
        await loginPage.assertDashboard()

        // Step 2: Open notification overlay.
        await notificationsPage.openNotificationOverlay()

        // Step 3: Open Mentions tab and click any mention notification.
        await notificationsPage.openMentionsTab()
        await notificationsPage.openMentionedWorkstream(workstreamName)

        // Step 4: Verify same mentioned workstream is opened.
        await notificationsPage.verifyWorkstreamOpened(workstreamName)

        await context.close()
    })
})
