import { expect } from "@playwright/test";
import { ChatCreation } from "../../locators/QA/chatCreation";
export class newChatCreationPage {
    private chatCreation: ChatCreation;
    constructor(chatCreation: ChatCreation) {
        this.chatCreation = chatCreation;
    }
    async createNewChat(chatName: string, agentRuntime: string, collaborators: string) {
        await expect(this.chatCreation.newQaWorkStream).toBeVisible({ timeout: 60000 })
        await this.chatCreation.newQaWorkStream.click({ timeout: 50000 })
        await expect(this.chatCreation.startNewChat).toBeVisible({ timeout: 30000 })
        await this.chatCreation.startNewChat.click()
        await expect(this.chatCreation.enterChatName).toBeVisible({ timeout: 30000 })
        await this.chatCreation.enterChatName.fill(chatName)
        await this.chatCreation.agentRunTime.selectOption(agentRuntime)
        await this.chatCreation.requestCollaborators.fill(collaborators)
        await this.chatCreation.createChatBtn.click()
    }
}
