import { expect } from "@playwright/test";
import { ChatCreation } from "../../locators/QA/chatCreation";
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

        if (!await this.chatCreation.EnterChatName.isVisible({ timeout: 3000 }).catch(() => false)) {
            if (await this.chatCreation.startNewChat.isVisible().catch(() => false)) {
                await this.chatCreation.startNewChat.click()
            } else {
                await expect(this.chatCreation.newQaWorkStream).toBeVisible({ timeout: 60000 })
                await this.chatCreation.newQaWorkStream.click({ timeout: 50000 })
            }
        }

        await expect(this.chatCreation.EnterChatName).toBeVisible({ timeout: 30000 })
        await this.chatCreation.EnterChatName.fill(chatName)
        await this.chatCreation.agentRunTime.selectOption(agentRuntime)
        await this.chatCreation.requestCollaborators.fill(collaborators)
        await this.chatCreation.requestCollaborators.press('Enter')
        await this.chatCreation.page.waitForTimeout(500)

        if (await this.chatCreation.requestCollaboratorsBtn.isVisible().catch(() => false)) {
            await this.chatCreation.requestCollaboratorsBtn.click()
        } else {
            await this.chatCreation.requestCollaborators.press('ArrowDown')
            await this.chatCreation.requestCollaborators.press('Enter')
        }

        await this.chatCreation.page.waitForTimeout(500)
        const selectedCollaborator = this.chatCreation.page.locator('span', { hasText: collaborators }).first()
        if (await selectedCollaborator.isVisible().catch(() => false)) {
            await expect(selectedCollaborator).toBeVisible({ timeout: 10000 })
        }

        const inviteButton = this.chatCreation.page.getByRole('button', { name: /Invite/i }).first()
        if (await inviteButton.isVisible().catch(() => false)) {
            await inviteButton.click()
        }

        await expect(this.chatCreation.createChatBtn).toBeVisible({ timeout: 15000 })
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
        await this.chatCreation.username.fill('nazia.khanam')
       await this.chatCreation.page.locator('button[type="button"][aria-haspopup="menu"]').last().click()
       await this.chatCreation.page.getByText('Assign').last().click
    }

    async changeWorkstreamStatus(workstreamName: string, newStatus: string, comment: string = 'Updating status') {
        await this.chatCreation.page
            .locator('button')
            .filter({ hasText: workstreamName })
            .first()
            .click()

        const changeStatusButton = this.chatCreation.page.getByRole('button', { name: 'Change status' }).first()
        await expect(changeStatusButton).toBeVisible({ timeout: 15000 })
        await changeStatusButton.click()

        const statusDialog = this.chatCreation.page
            .locator('div')
            .filter({ hasText: /Change workstream status/i })
            .first()
        await expect(statusDialog).toBeVisible({ timeout: 15000 })

        await statusDialog.getByRole('button', { name: newStatus }).click()
        const commentField = statusDialog.getByPlaceholder('Add a comment')
        await expect(commentField).toBeVisible({ timeout: 10000 })
        await commentField.fill(comment)

        await this.chatCreation.page.locator('button[aria-label="Change status"]')
    }
}
