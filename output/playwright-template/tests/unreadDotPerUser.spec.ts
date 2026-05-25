import { expect, test } from "@playwright/test"
import { ChatCreationData } from "../data/chatCreationData"
import { LoginData } from "../data/loginData"
import { ChatCreation } from "../locators/QA/chatCreation"
import { LoginPage } from "../locators/loginPage"
import { TurboLogin } from "../pages/turboLogin"
import { newChatCreationPage } from "../pages/QA/chatcreationPage"
import { WorkstreamPage } from "../pages/QA/workstreamPage"


test.describe("Unread Dot Per User", () => {
  test("TC_NOTIF_024 - unread dot is scoped per user in the same workstream", async ({ browser }) => {
    test.setTimeout(120000)

    const actorEmail = LoginData.Email1
    const actorPassword = LoginData.password1
    const recipientEmail = LoginData.Email3
    const recipientPassword = LoginData.password3
    const workstreamName = `WS-NOTIF-UNREAD-024 ${Date.now()}`

    const actorContext = await browser.newContext({ permissions: ['notifications'] })
    const actorPage = await actorContext.newPage()
    const actorLoginPage = new TurboLogin(new LoginPage(actorPage))
    const chatCreationPage = new newChatCreationPage(new ChatCreation(actorPage))
    const actorWorkstreamPage = new WorkstreamPage(actorPage)

    await actorLoginPage.navigateToLogin()
    await actorLoginPage.emailFill(actorEmail)
    await actorLoginPage.PasswordFill(actorPassword)
    await actorLoginPage.assertDashboard()

    await chatCreationPage.createNewChat(workstreamName, ChatCreationData.TestAgent, recipientEmail)
    await actorWorkstreamPage.openWorkstream(workstreamName)
    await actorWorkstreamPage.sendMessageToOpenWorkstream('First unread message for TC_NOTIF_024')
    await actorWorkstreamPage.sendMessageToOpenWorkstream('Second unread message for TC_NOTIF_024')

    const recipientContext = await browser.newContext({ permissions: ['notifications'] })
    const recipientPage = await recipientContext.newPage()
    const recipientLoginPage = new TurboLogin(new LoginPage(recipientPage))
    const recipientWorkstreamPage = new WorkstreamPage(recipientPage)

    await recipientLoginPage.navigateToLogin()
    await recipientLoginPage.emailFill(recipientEmail)
    await recipientLoginPage.PasswordFill(recipientPassword)
    await recipientLoginPage.assertDashboard()

    await recipientWorkstreamPage.expectWorkstreamUnreadDot(workstreamName, true)
    await actorWorkstreamPage.expectWorkstreamUnreadDot(workstreamName, false)

    await recipientContext.close()
    await actorContext.close()
  })
})
