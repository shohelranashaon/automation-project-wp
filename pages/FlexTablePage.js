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
        const menu = this.page.getByRole('link', { name: /FlexTable/i }).first();
        const locator = (await menu.count()) ? menu : this.flexTable?.flexTableMenu;
        await locator.waitFor({ state: 'visible', timeout: 10000 });
        await locator.click();
        await this.page.waitForURL(/admin\.php\?page=gswpts-dashboard/, { timeout: 30000 });
        await this.page.waitForLoadState('networkidle');
    }

    async verifyFlexTableDashboard(){
        await this.page.waitForURL(/admin\.php\?page=gswpts-dashboard/, { timeout: 30000 });
        const createBtn = this.page.getByRole('button', { name: /Create new table/i })
            .or(this.page.getByRole('link', { name: /Create new table/i }));
        await createBtn.waitFor({ state: 'visible', timeout: 10000 });
    }

    async clickCreateNewTable(){
        const createBtn = this.page.getByRole('button', { name: /Create new table/i })
            .or(this.page.getByRole('link', { name: /Create new table/i }));
        await createBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async insertSheetUrl(url="https://docs.google.com/spreadsheets/d/11qRH9xUuglOTIZa7JnWTVBYuGMT32ZhFuJ5_xypApGM/edit?gid=0#gid=0"){
        await this.flexTable.insertUrl.fill(url);
    }

    async clickCreateTableButton(){
        await this.flexTable.createTableButton.click();
        await this.page.waitForLoadState('networkidle');    
}
    async inputTableName(name="Test Table"){
        await this.flexTable.inputTableName.fill(name);     
    }

    async inputTableDescription(description="This is a test table created by automation script."){
        await this.flexTable.tableDescription.fill(description);     
    }
    async clickSaveTableButton(){
        await this.flexTable.saveTableButton.click();
        await this.page.waitForLoadState('networkidle');    
    }

}