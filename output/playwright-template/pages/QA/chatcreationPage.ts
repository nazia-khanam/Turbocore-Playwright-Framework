import { expect } from "@playwright/test";
import  { ChatCreation } from "../../locators/QA/chatCreation";
export class newChatCreationPage {
    private chatCreation: ChatCreation;
    constructor(chatCreation: ChatCreation) {
        this.chatCreation = chatCreation;
    }
    async createNewChat(chatName: string, agentRuntime: string, collaborators: string) {
        await this.chatCreation.newQaWorkStream.click()
        await this.chatCreation.EnterChatName.fill(chatName)
        await this.chatCreation.agentRunTime.selectOption(agentRuntime)
        await this.chatCreation.requestCollaborators.fill(collaborators)
        await this.chatCreation.createChatBtn.click()
    }
}