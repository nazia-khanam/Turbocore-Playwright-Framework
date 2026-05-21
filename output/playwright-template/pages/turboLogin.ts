import { expect } from "@playwright/test";
import { LoginPage } from "../locators/loginPage";
 
export class TurboLogin {
    private loginPage: LoginPage;
    constructor(loginPage: LoginPage) {
        this.loginPage = loginPage;
    }
       async navigateToLogin() {
        await this.loginPage.page.goto('https://test.turbocore.soais.com/api/v3/auth/login', { waitUntil: 'commit', timeout: 60000 });
        await this.loginPage.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {})
        await expect(this.loginPage.headerVerification).toHaveText('Welcome')
        await expect(this.loginPage.logoVerification).toBeVisible()
    }
        async emailFill(email: string) {
        await this.loginPage.emailInput.fill(email);
        await this.loginPage.continueBtn.last().click()
    }
    async PasswordFill(password: string) {
        await expect(this.loginPage.headerVerification).toHaveText('Enter Your Password')
        await this.loginPage.PasswordInput.fill(password);
        await this.loginPage.continueBtn.last().click({ noWaitAfter: true })
    }
     async assertDashboard() {
        await expect(this.loginPage.page).toHaveURL('https://test.turbocore.soais.com/v3/client/qa', { timeout: 60000 });
        // await this.loginPage.page.pause()
        await expect(this.loginPage.page.getByText('QA Workstreams')).toBeVisible()
    }
 
}
 
