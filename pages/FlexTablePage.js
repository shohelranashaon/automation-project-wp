import { FlexTable } from '../locators/locators';
export class FlexTablePage{
    constructor(page){
        this.page=page;
        this.flexTable=new FlexTable(page);
    }

    /**
     * Navigate to FlexTable Dashboard
     * Clicks on FlexTable menu in WordPress admin sidebar
     */
    async navigateToFlexTableDashboard(){
        await this.flexTable.flexTableMenu.click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyFlexTableDashboard(){
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForURL(/admin\.php\?page=gswpts-dashboard/, { timeout: 30000 });
        
        // Wait for React SPA to render
        await this.page.waitForTimeout(2000);
        
        // Verify dashboard loaded by checking for "Create new table" button/link which always exists
        // Use role-based locator to match both button and link elements
        await this.flexTable.createTableElementForVerification.waitFor({ state: 'visible', timeout: 10000 });
    }
}