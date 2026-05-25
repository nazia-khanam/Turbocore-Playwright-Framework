import { test } from "@playwright/test"
import { ChatCreationData } from "../data/chatCreationData"
import { LoginData } from "../data/loginData"
import { ChatCreation } from "../locators/QA/chatCreation"
import { LoginPage } from "../locators/loginPage"
import { TurboLogin } from "../pages/turboLogin"
import { newChatCreationPage } from "../pages/QA/chatcreationPage"

test.describe("Workstream Status Change", () => {
    test("TC_NOTIF_020 - create a new chat and change status from Drafting to In Review", async ({ browser }) => {
        test.setTimeout(120000)

        const actorEmail = LoginData.Email1
        const actorPassword = LoginData.password1
        const workstreamName = `${ChatCreationData.TestChat} ${Date.now()}`

        const actorContext = await browser.newContext({ permissions: ['notifications'] })
        const actorPage = await actorContext.newPage()
        const actorLoginPage = new TurboLogin(new LoginPage(actorPage))
        const chatCreationPage = new newChatCreationPage(new ChatCreation(actorPage))

        await actorLoginPage.navigateToLogin()
        await actorLoginPage.emailFill(actorEmail)
        await actorLoginPage.PasswordFill(actorPassword)
        await actorLoginPage.assertDashboard()

        await chatCreationPage.createNewChat(workstreamName, ChatCreationData.TestAgent, ChatCreationData.Collaborators2)
        // Change the created workstream status from Drafting to In Review with a comment
        await chatCreationPage.changeWorkstreamStatus(workstreamName, 'In Review', 'Moving the workstream to In Review')

        await actorContext.close()
    })
})
