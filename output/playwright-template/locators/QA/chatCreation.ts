import { Page, Locator } from "@playwright/test";

export class ChatCreation {
    readonly page: Page;
    readonly newQaWorkStream: Locator;
    readonly EnterChatName: Locator;
    readonly agentRunTime: Locator;
    readonly requestCollaborators: Locator;
    readonly createChatBtn: Locator;
    constructor(page: Page) {
        this.page = page
        this.newQaWorkStream = page.locator('button[aria-label="New QA Workstream"]')
        this.EnterChatName = page.locator('input[id="request-title"]')
        this.agentRunTime = page.locator('select[id="request-runtime"]')
        this.requestCollaborators = page.locator('input[id="request-collaborators"]')
        this.createChatBtn = page.getByText('Create Chat')
    }
}