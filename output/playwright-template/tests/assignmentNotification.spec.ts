import { test } from "@playwright/test"
import { ChatCreationData } from "../data/chatCreationData"
import { LoginData } from "../data/loginData"
import { ChatCreation } from "../locators/QA/chatCreation"
import { LoginPage } from "../locators/loginPage"
import { Notification } from "../locators/notificationPage"
import { TurboLogin } from "../pages/turboLogin"
import { NotificationsPage } from "../pages/notification"
import { newChatCreationPage } from "../pages/QA/chatcreationPage"

test.describe("Assignment Notification", () => {
    test("TC_NOTIF_013 - assignment notification is generated for recipient", async ({ browser }) => {
        test.setTimeout(90000)

        const actorEmail = LoginData.Email1
        const actorPassword = LoginData.password1
        const recipientEmail = LoginData.Email3
        const recipientPassword = LoginData.password3
        const workstreamName = `${ChatCreationData.TestChat} ${Date.now()}`
        const memberName = "nazia.khanam"

        // Step 1: Login as Maruthi, create a new chat, and assign Nazia Khan.
        const actorContext = await browser.newContext({ permissions: ['notifications'] })
        const actorPage = await actorContext.newPage()
        const actorLoginPage = new TurboLogin(new LoginPage(actorPage))
        const chatCreationPage = new newChatCreationPage(new ChatCreation(actorPage))

        await actorLoginPage.navigateToLogin()
        await actorLoginPage.emailFill(actorEmail)
        await actorLoginPage.PasswordFill(actorPassword)
        await actorLoginPage.assertDashboard()
        await chatCreationPage.createNewChat(workstreamName, ChatCreationData.TestAgent, recipientEmail)
        await chatCreationPage.assignMemberToWorkstream(workstreamName, memberName)
        await actorContext.close()

        // Step 2: Log in as Nazia.
        const recipientContext = await browser.newContext({ permissions: ['notifications'] })
        const recipientPage = await recipientContext.newPage()
        const recipientLoginPage = new TurboLogin(new LoginPage(recipientPage))
        const notificationsPage = new NotificationsPage(new Notification(recipientPage))

        await recipientLoginPage.navigateToLogin()
        await recipientLoginPage.emailFill(recipientEmail)
        await recipientLoginPage.PasswordFill(recipientPassword)
        await recipientLoginPage.assertDashboard()

        // Step 3: Click notification bell and open notification overlay.
        await notificationsPage.openNotificationOverlay()

        // Step 4: Click Assigned filter and verify assignment notification exists.
        await notificationsPage.openAssignedTab()
        await notificationsPage.verifyAssignmentNotification(workstreamName, recipientEmail)

        await recipientContext.close()
    })
})
