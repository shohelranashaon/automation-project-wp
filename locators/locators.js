// Login Locators
export class Login {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator("//input[@id='user_login']");
        this.passwordInput = page.locator("//input[@id='user_pass']");
        this.loginButton = page.locator("//input[@id='wp-submit']");
    }
}

// Dashboard Locators
export class Dashboard {
    constructor(page) {
        this.page = page;
        // Plugins menu item in the WordPress admin sidebar
        this.pluginsMenu = page.locator("//a[@class='wp-has-submenu wp-not-current-submenu menu-top menu-icon-plugins']//div[@class='wp-menu-name']");
        this.installedPluginsLink = page.locator("//a[normalize-space()='Installed Plugins']");
        this.dashboardButton = page.locator("//div[normalize-space()='Dashboard']");
    }
}

// Plugin Page Locators
export class Plugin {
    constructor(page) {
        this.page = page;
        this.addPluginButton = page.locator("//a[@class='page-title-action']");
        this.searchInput = page.locator("input#search-plugins").first();
        this.pluginTableRows = page.locator("table.wp-list-table tbody tr");
        this.pluginSearchInput = page.locator("#plugin-search-input");
        this.installNowButton = page.locator("a.install-now");
        // Activate button that appears after plugin installation
        this.activateButtonAfterInstall = page.locator("a.button-primary[href*='action=activate']").first();
    }
}

// FlexTable Locators
export class FlexTable {
    constructor(page) {
        this.page = page;
        this.FlexTableMenu = page.locator("//div[normalize-space()='FlexTable']");
        // FlexTable menu in WordPress admin sidebar
        this.createTable = page.locator("//button[@class='btn btn-lg']");
        this.insertUrl = page.locator("//input[@id='sheet-url']");
        this.createTableButton = page.locator("//button[@class='btn ']");
        this.inputTableName = page.locator("//input[@id='table-name']");
        this.tableDescription = page.locator("//textarea[@id='table-description']");
        this.saveTableButton = page.locator("//button[@class='table-action__save']");
        
    }
}



