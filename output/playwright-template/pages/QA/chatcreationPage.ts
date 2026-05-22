import { expect } from "@playwright/test";
import  { ChatCreation } from "../../locators/QA/chatCreation";
export class newChatCreationPage {
    private chatCreation: ChatCreation;
    constructor(chatCreation: ChatCreation) {
        this.chatCreation = chatCreation;
    }
    async createNewChat(chatName: string, agentRuntime: string, collaborators: string) {
        await this.chatCreation.page
            .getByText(/Loading workstreams/i)
            .waitFor({ state: 'hidden', timeout: 30000 })
            .catch(() => {})

        if (await this.chatCreation.startNewChat.isVisible().catch(() => false)) {
            await this.chatCreation.startNewChat.click()
        }

        if (!await this.chatCreation.EnterChatName.isVisible({ timeout: 3000 }).catch(() => false)) {
            await expect(this.chatCreation.newQaWorkStream).toBeVisible()
            await this.chatCreation.newQaWorkStream.click()
        }

        await expect(this.chatCreation.EnterChatName).toBeVisible({ timeout: 10000 })
        await this.chatCreation.EnterChatName.fill(chatName)
        await this.chatCreation.agentRunTime.selectOption(agentRuntime)
        await this.chatCreation.requestCollaborators.fill(collaborators)
        await this.chatCreation.requestCollaboratorsBtn.hover()
        await this.chatCreation.requestCollaboratorsBtn.click()
        await this.chatCreation.createChatBtn.click()
        await expect(this.chatCreation.page.locator('h2').filter({ hasText: chatName }).first()).toBeVisible({ timeout: 15000 })
    }

    async assignMemberToWorkstream(workstreamName: string, memberName: string) {
        await this.chatCreation.page
            .locator('button')
            .filter({ hasText: workstreamName })
            .first()
            .click()

        const assignedMessage = this.chatCreation.page.getByText(`Workstream assigned to ${memberName}`)
        if (await assignedMessage.isVisible().catch(() => false)) {
            return
        }

        await expect(this.chatCreation.inviteCollaboratorsBtn).toBeVisible()
        await this.chatCreation.inviteCollaboratorsBtn.click()

        const inviteDialog = this.chatCreation.page
            .locator('div')
            .filter({ hasText: 'Invite Collaborators' })
            .filter({ hasText: 'MEMBERS' })
            .first()
        await expect(inviteDialog).toBeVisible()

       await this.chatCreation.page.locator('button[type="button"][aria-haspopup="menu"]').last().click()
       await this.chatCreation.page.getByText('Assign').last().click
    }
}
