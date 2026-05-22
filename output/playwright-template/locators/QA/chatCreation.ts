import { Page, Locator } from "@playwright/test";

export class ChatCreation {
    readonly page: Page;
    readonly newQaWorkStream: Locator;
    readonly startNewChat: Locator;
    readonly EnterChatName: Locator;
    readonly agentRunTime: Locator;
    readonly requestCollaborators: Locator;
    readonly requestCollaboratorsBtn: Locator;
    readonly createChatBtn: Locator;
    readonly inviteCollaboratorsBtn: Locator;
    readonly assignMenuItem: Locator;
    constructor(page: Page) {
        this.page = page
        this.newQaWorkStream = page.locator('button[aria-label="New QA Workstream"]')
        this.startNewChat = page.getByRole('button', { name: /Start a New Chat/i })
        this.EnterChatName = page.locator('input[id="request-title"]')
        this.agentRunTime = page.locator('select[id="request-runtime"]')
        this.requestCollaborators = page.locator('input[id="request-collaborators"]')
        this.createChatBtn = page.getByText('Create Chat')
        this.inviteCollaboratorsBtn = page.getByRole('button', { name: /Share and invite collaborators/i })
        this.assignMenuItem = page.getByRole('menuitem').filter({ hasText: 'Assign' })
        this.requestCollaboratorsBtn = page.locator('button[type="button"]>span[class="text-xs text-muted-foreground"]')
    }
}