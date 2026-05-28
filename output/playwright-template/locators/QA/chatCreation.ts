import { Page, Locator } from "@playwright/test";

export class ChatCreation {
    readonly page: Page;
    readonly newQaWorkStream: Locator;
    readonly startNewChat: Locator;
    readonly enterChatName: Locator;
    readonly EnterChatName: Locator;
    readonly agentRunTime: Locator;
    readonly requestCollaborators: Locator;
    readonly requestCollaboratorsBtn: Locator;
    readonly createChatBtn: Locator;
    readonly inviteCollaboratorsBtn: Locator;
    readonly assignMenuItem: Locator;
    readonly username: Locator;
    readonly sharesuggestion : Locator
    constructor(page: Page) {
        this.page = page
        this.newQaWorkStream = page.locator('button[aria-label="New QA Workstream"]')
        this.startNewChat = page.getByRole('button', { name: 'Start a New Chat' })
        this.enterChatName = page.locator('input[placeholder*="chat" i], input[placeholder*="workstream" i], input[name*="chat" i], input[name*="workstream" i]').first()
        this.startNewChat = page.getByRole('button', { name: /Start a New Chat/i })
        this.EnterChatName = page.locator('input[id="request-title"]')
        this.agentRunTime = page.locator('select[id="request-runtime"]')
        this.requestCollaborators = page.locator('input[id="request-collaborators"]')
        this.createChatBtn = page.getByText('Create Chat')
        this.inviteCollaboratorsBtn = page.getByRole('button', { name: /Share and invite collaborators/i })
        this.assignMenuItem = page.getByRole('menuitem').filter({ hasText: 'Assign' })
        this.requestCollaboratorsBtn = page.locator('button[id="new-request-collaborator-suggestion-0"]')
        this.sharesuggestion = page.locator('button[id="share-suggestion-0"]')
        this.username =page.getByPlaceholder('Add user email ID here')
    }
}
