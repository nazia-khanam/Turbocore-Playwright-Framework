import { test } from "@playwright/test"
import { TurboLogin } from "../pages/turboLogin"
import { LoginData } from "../data/loginData"
import { LoginPage } from "../locators/loginPage"
import { NotificationsPage } from "../pages/notification"
import { Notification } from "../locators/notificationPage"
import { ChatCreation } from "../locators/QA/chatCreation"
import { newChatCreationPage } from "../pages/QA/chatcreationPage"
import { ChatCreationData } from "../data/chatCreationData"

test.describe("Notification Functionality", () => {

    test('TC_NOTIF_Verify Bell icon unread indicator', async ({ browser }) => {

        const user1Context = await browser.newContext({permissions: ['notifications']})
        const user1Page = await user1Context.newPage()

        const loginPage1 = new TurboLogin(new LoginPage(user1Page))
        const chatCreationPage1 = new newChatCreationPage(new ChatCreation(user1Page))

        await loginPage1.navigateToLogin()

        await loginPage1.emailFill(LoginData.Email2)

        await loginPage1.PasswordFill(LoginData.password2)

        await loginPage1.assertDashboard()

        await chatCreationPage1.createNewChat(ChatCreationData.TestChat, ChatCreationData.TestAgent, ChatCreationData.Collaborators1)


        // =========================
        // SECOND USER CONTEXT
        // =========================

        const user2Context = await browser.newContext({permissions: ['notifications']})
        const user2Page = await user2Context.newPage()

        const loginPage2 = new TurboLogin(new LoginPage(user2Page))
        const notificationsPage2 = new NotificationsPage(new Notification(user2Page))

        await loginPage2.navigateToLogin()

        await loginPage2.emailFill(LoginData.Email1)

        await loginPage2.PasswordFill(LoginData.password1)

        await loginPage2.assertDashboard()

        await notificationsPage2.UnreadBadgeVerify()

        await user1Context.close()

        await user2Context.close()
    })
})