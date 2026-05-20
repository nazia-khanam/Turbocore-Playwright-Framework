import { expect } from "@playwright/test";
import  { ChatCreation } from "../../locators/QA/chatCreation";
export class newChatCreationPage {
    private chatCreation: ChatCreation;
    constructor(chatCreation: ChatCreation) {
        this.chatCreation = chatCreation;
    }
    async createNewChat(chatName: string, agentRuntime: string, collaborators: string) {
        await this.chatCreation.newQaWorkStream.waitFor()
        await this.chatCreation.newQaWorkStream.click({force:true})
        await this.chatCreation.EnterChatName.fill(chatName,{force:true})
        await this.chatCreation.agentRunTime.selectOption(agentRuntime)
        await this.chatCreation.requestCollaborators.fill(collaborators)
        await this.chatCreation.createChatBtn.click()
    }
}