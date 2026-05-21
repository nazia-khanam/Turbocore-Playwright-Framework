import { Page, Locator } from "@playwright/test";

export class ChatCreation {
    readonly page: Page;
    readonly newQaWorkStream: Locator;
    readonly startNewChat: Locator;
    readonly enterChatName: Locator;
    readonly agentRunTime: Locator;
    readonly requestCollaborators: Locator;
    readonly createChatBtn: Locator;
    constructor(page: Page) {
        this.page = page
        this.newQaWorkStream = page.locator('button[aria-label="New QA Workstream"]')
        this.startNewChat = page.getByRole('button', { name: 'Start a New Chat' })
        this.enterChatName = page.locator('input[placeholder*="chat" i], input[placeholder*="workstream" i], input[name*="chat" i], input[name*="workstream" i]').first()
        this.agentRunTime = page.locator('select[id="request-runtime"]')
        this.requestCollaborators = page.locator('input[id="request-collaborators"]')
        this.createChatBtn = page.getByText('Create Chat')
    }
}
