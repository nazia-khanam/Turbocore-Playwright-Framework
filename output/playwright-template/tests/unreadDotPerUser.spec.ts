import { expect, test } from "@playwright/test"
import { LoginData } from "../data/loginData"
import { LoginPage } from "../locators/loginPage"
import { TurboLogin } from "../pages/turboLogin"
import { WorkstreamPage } from "../pages/QA/workstreamPage"


test.describe("Unread Dot Per User", () => {
  test("TC_NOTIF_024 - unread dot is scoped per user in the same workstream", async ({ browser }) => {
    test.setTimeout(120000)

    const actorEmail = LoginData.Email1
    const actorPassword = LoginData.password1
    const recipientEmail = LoginData.Email3
    const recipientPassword = LoginData.password3
    const actorContext = await browser.newContext({ permissions: ['notifications'] })
    const actorPage = await actorContext.newPage()
    const actorLoginPage = new TurboLogin(new LoginPage(actorPage))
    const actorWorkstreamPage = new WorkstreamPage(actorPage)

    await actorLoginPage.navigateToLogin()
    await actorLoginPage.emailFill(actorEmail)
    await actorLoginPage.PasswordFill(actorPassword)
    await actorLoginPage.assertDashboard()

    const recipientSetupContext = await browser.newContext({ permissions: ['notifications'] })
    const recipientSetupPage = await recipientSetupContext.newPage()
    const recipientSetupLoginPage = new TurboLogin(new LoginPage(recipientSetupPage))
    const recipientSetupWorkstreamPage = new WorkstreamPage(recipientSetupPage)

    await recipientSetupLoginPage.navigateToLogin()
    await recipientSetupLoginPage.emailFill(recipientEmail)
    await recipientSetupLoginPage.PasswordFill(recipientPassword)
    await recipientSetupLoginPage.assertDashboard()

    const actorWorkstreamNames = await actorWorkstreamPage.visibleWorkstreamNames()
    const recipientWorkstreamNames = await recipientSetupWorkstreamPage.visibleWorkstreamNames()
    const workstreamName = actorWorkstreamNames.find(name => recipientWorkstreamNames.includes(name))

    expect(workstreamName, 'Expected at least one existing workstream shared by actor and recipient').toBeTruthy()
    await recipientSetupContext.close()
    await actorWorkstreamPage.openWorkstream(workstreamName!)

    const scenarioName = 'scenario_15_unread_dot_per_user'
    const firstMessage = `${scenarioName} - ${Date.now()} - First unread message`

    await actorWorkstreamPage.sendMessageToOpenWorkstream(firstMessage)

    // close actor session so the chat message is unread for the recipient
    await actorContext.close()

    const recipientContext = await browser.newContext({ permissions: ['notifications'] })
    const recipientPage = await recipientContext.newPage()
    const recipientLoginPage = new TurboLogin(new LoginPage(recipientPage))
    const recipientWorkstreamPage = new WorkstreamPage(recipientPage)

    await recipientLoginPage.navigateToLogin()
    await recipientLoginPage.emailFill(recipientEmail)
    await recipientLoginPage.PasswordFill(recipientPassword)
    await recipientLoginPage.assertDashboard()

    const recipientChatButton = recipientWorkstreamPage.workstreamItem(workstreamName!)
    await expect(recipientChatButton).toBeVisible({ timeout: 20000 })

    // recipient should see unread on the selected existing workstream
    await recipientWorkstreamPage.expectWorkstreamUnreadDot(workstreamName!, true)
    await recipientWorkstreamPage.expectUnreadDotIsBlue(workstreamName!)

    await recipientContext.close()
  })
})
