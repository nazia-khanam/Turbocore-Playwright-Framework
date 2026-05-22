import { test } from "@playwright/test"
import { TurboLogin } from "../pages/turboLogin"
import { LoginData } from "../data/loginData"
import { LoginPage } from "../locators/loginPage"
import { NotificationsPage } from "../pages/notification"
import { Notification } from "../locators/notificationPage"
let loginPage: TurboLogin
let notificationsPage: NotificationsPage
test.describe("Notification Functionality", async () => {
    test.beforeEach(async ({ page }) => {
        loginPage = new TurboLogin(new LoginPage(page))
        notificationsPage = new NotificationsPage(new Notification(page))
        await loginPage.navigateToLogin()
    })
    test('TC_NOTIF_Verify Bell icon placement', async ({ page }) => {
        await loginPage.emailFill(LoginData.Email1)
        await loginPage.PasswordFill(LoginData.password1)
        await loginPage.assertDashboard()
        await notificationsPage.BellIconVerify()
    })
 
})