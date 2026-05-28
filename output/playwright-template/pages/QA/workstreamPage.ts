import { expect, Locator, Page } from "@playwright/test"

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export class WorkstreamPage {
  readonly page: Page
  readonly messageInput: Locator

  constructor(page: Page) {
    this.page = page
    this.messageInput = page.locator(
      'textarea[placeholder*="Type a message"], textarea[placeholder*="message"], input[placeholder*="Type a message"], input[placeholder*="message"], [data-placeholder*="Type a message"], [data-placeholder*="message"], [placeholder*="Type a message"], [placeholder*="message"], [contenteditable="true"]'
    )
  }

  workstreamItem(workstreamName: string) {
    return this.page
      .locator('button')
      .filter({
        has: this.page.locator('p').filter({ hasText: new RegExp(`^${escapeRegExp(workstreamName)}$`) }),
      })
      .first()
  }

  firstWorkstreamItem() {
    return this.page.locator('button').filter({
      hasText: /Drafting|Completed|In Review|Ready|Assigned|You were mentioned|You were added/i,
      hasNotText: /Send|Continue|Start|New Chat|Create|Logout|Sign out|Profile|Settings|Help|Notifications|Account menu|Toggle theme|Collapse workstreams|All|Assigned to me|Mentions|Status/i,
    }).first()
  }

  async visibleWorkstreamNames() {
    const items = this.page.locator('button').filter({
      has: this.page.locator('p'),
      hasNotText: /Send|Continue|Start|New Chat|Create|Logout|Sign out|Profile|Settings|Help|Notifications|Account menu|Toggle theme|Collapse workstreams|All|Assigned to me|Mentions|Status/i,
    })
    const names: string[] = []
    const count = await items.count()

    for (let i = 0; i < count; i++) {
      const item = items.nth(i)
      if (!await item.isVisible().catch(() => false)) {
        continue
      }

      const name = (await item.locator('p').first().textContent())?.trim()
      if (name && !names.includes(name)) {
        names.push(name)
      }
    }

    return names
  }

  async openAnyWorkstream() {
    const item = this.firstWorkstreamItem()
    await expect(item).toBeVisible({ timeout: 20000 })
    const name = (await item.locator('p').first().textContent())?.trim() || (await item.textContent())?.trim() || ''
    await item.click()
    await this.page.locator('textarea[placeholder*="Type a message"], textarea[placeholder*="message"], input[placeholder*="Type a message"], input[placeholder*="message"], [contenteditable="true"]').first().waitFor({ state: 'visible', timeout: 20000 })
    return name
  }

  async openWorkstream(workstreamName: string) {
    const item = this.workstreamItem(workstreamName)
    await expect(item).toBeVisible({ timeout: 20000 })
    await item.click()
    await expect(this.messageInput.first()).toBeVisible({ timeout: 20000 })
  }

  async getVisibleSendButton() {
    const buttons = this.page.locator('button[aria-label*="send" i], button[title*="send" i], [data-testid*="send" i]')
    const count = await buttons.count()
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i)
      if (await button.isVisible().catch(() => false) && (await button.isEnabled().catch(() => false))) {
        return button
      }
    }
    return buttons.first()
  }

  async sendMessageToOpenWorkstream(message: string) {
    const messageField = this.messageInput.first()
    await expect(messageField).toBeVisible({ timeout: 20000 })
    await messageField.click()
    await messageField.press(process.platform === 'darwin' ? 'Meta+A' : 'Control+A')
    await messageField.press('Backspace')
    await messageField.pressSequentially(message, { delay: 5 })

    const button = await this.getVisibleSendButton()
    if (button) {
      await button.click()
    } else {
      await messageField.press('Enter')
    }

    await expect(this.page.getByText(message, { exact: true })).toBeVisible({ timeout: 20000 })
  }

  async openAndSendMessage(workstreamName: string, message: string) {
    await this.openWorkstream(workstreamName)
    await this.sendMessageToOpenWorkstream(message)
  }

  unreadVisualLocator(workstreamName: string) {
    return this.workstreamItem(workstreamName).locator(
      'span[title="Unread"], span[title*="Unread"], [aria-label="Unread"], [aria-label*="Unread"], span.bg-button-primary, [title="You were mentioned"], [aria-label="You were mentioned"]'
    )
  }

  async expectWorkstreamUnreadDot(workstreamName: string, shouldExist: boolean) {
    if (shouldExist) {
      await expect(this.unreadVisualLocator(workstreamName).first()).toBeVisible({ timeout: 20000 })
    } else {
      await expect(this.unreadVisualLocator(workstreamName)).toHaveCount(0, { timeout: 20000 })
    }
  }
 
  async getUnreadDotColor(workstreamName: string) {
    const visual = this.unreadVisualLocator(workstreamName).first()
    // If there's a visible explicit element for the unread dot, use its computed style
    if ((await visual.count()) > 0 && (await visual.isVisible().catch(() => false))) {
      const color = await visual.evaluate((el: Element) => {
        const s = window.getComputedStyle(el as HTMLElement)
        const background = s.backgroundColor || ''
        if (background && background !== 'rgba(0, 0, 0, 0)' && background !== 'transparent') {
          return background
        }

        const coloredChild = (el as HTMLElement).querySelector('svg, [class*="text-button-primary"], [class*="bg-button-primary"]') as HTMLElement | null
        if (coloredChild) {
          const childStyle = window.getComputedStyle(coloredChild)
          return childStyle.color || childStyle.backgroundColor || ''
        }

        return s.color || ''
      })
      return color as string
    }

    // Fallback: try to derive color from the workstream button (dot may be a pseudo-element)
    const button = this.workstreamItem(workstreamName)
    await expect(button).toBeVisible({ timeout: 20000 })
    const color = await button.evaluate((el: Element) => {
      const host = el as HTMLElement

      // look for common child elements that could be the dot
      const selectors = ['[aria-label*="unread"]', '[class*="unread"]', '.unread-dot', '.dot', 'span']
      for (const sel of selectors) {
        const child = host.querySelector(sel) as HTMLElement | null
        if (child) {
          const s = window.getComputedStyle(child)
          const c = s.backgroundColor || s.color
          if (c) return c
        }
      }

      // try pseudo-elements on the button
      const before = window.getComputedStyle(host, '::before').backgroundColor
      if (before) return before
      const after = window.getComputedStyle(host, '::after').backgroundColor
      if (after) return after

      return ''
    })

    return color as string
  }
 
  async expectUnreadDotIsBlue(workstreamName: string) {
    const color = await this.getUnreadDotColor(workstreamName)
    const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
    if (!m) {
      throw new Error(`Could not parse color '${color}' for workstream '${workstreamName}'`)
    }
    const r = Number(m[1])
    const g = Number(m[2])
    const b = Number(m[3])

    await expect(b).toBeGreaterThan(r)
    await expect(b).toBeGreaterThan(g)
    await expect(b).toBeGreaterThanOrEqual(100)
  }
}
