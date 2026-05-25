import { expect, Locator, Page } from "@playwright/test"

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export class WorkstreamPage {
  readonly page: Page
  readonly messageInput: Locator
  readonly sendButton: Locator

  constructor(page: Page) {
    this.page = page
    this.messageInput = page.locator(
      'textarea[placeholder*="Type a message"], textarea[placeholder*="message"], input[placeholder*="Type a message"], input[placeholder*="message"], [data-placeholder*="Type a message"], [data-placeholder*="message"], [placeholder*="Type a message"], [placeholder*="message"], [contenteditable="true"]'
    )
    this.sendButton = page.locator(
      'button[aria-label*="send" i], button[title*="send" i], button:has-text("Send"), [role="button"][aria-label*="send" i], [role="button"][title*="send" i], [data-testid*="send" i]'
    )
  }

  workstreamItem(workstreamName: string) {
    return this.page.locator('button').filter({ hasText: workstreamName }).first()
  }

  async openWorkstream(workstreamName: string) {
    const item = this.workstreamItem(workstreamName)
    await expect(item).toBeVisible({ timeout: 20000 })
    await item.click()
  }

  async sendMessageToOpenWorkstream(message: string) {
    const messageField = this.messageInput.first()
    await expect(messageField).toBeVisible({ timeout: 20000 })
    await expect(this.sendButton.first()).toBeEnabled({ timeout: 30000 })
    await messageField.click()
    await messageField.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A')
    await messageField.press('Backspace')
    await messageField.pressSequentially(message, { delay: 5 })

    if (await this.sendButton.isVisible().catch(() => false)) {
      await this.sendButton.first().click()
    } else {
      await messageField.press('Enter')
    }

    await this.page.waitForTimeout(500)
    await expect(this.page.getByText(message, { exact: true })).toBeVisible({ timeout: 20000 })
    await expect(this.sendButton.first()).toBeEnabled({ timeout: 30000 })
  }

  async openAndSendMessage(workstreamName: string, message: string) {
    await this.openWorkstream(workstreamName)
    await this.sendMessageToOpenWorkstream(message)
  }

  unreadVisualLocator(workstreamName: string) {
    return this.workstreamItem(workstreamName).locator(
      '[aria-label*="unread" i], [class*="unread" i], .unread-dot'
    )
  }

  unreadStateLocator(workstreamName: string) {
    const accessibleName = new RegExp(`${escapeRegExp(workstreamName)}.*you were mentioned`, 'i')

    return this.unreadVisualLocator(workstreamName)
      .or(this.page.getByRole('button', { name: accessibleName }).first())
  }

  async expectWorkstreamUnreadDot(workstreamName: string, shouldExist: boolean) {
    if (shouldExist) {
      await expect(this.unreadStateLocator(workstreamName).first()).toBeVisible({ timeout: 20000 })
    } else {
      await expect(this.unreadVisualLocator(workstreamName)).toHaveCount(0)
    }
  }
}
