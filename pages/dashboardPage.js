import { Dashboard } from '../locators/locators';

export class DashboardPage{ 
    constructor(page){
        this.page=page;
        this.dashboard=new Dashboard(page);
    }

    /**
     * Navigate to Plugins → Installed Plugins
     */
    async navigateToInstalledPlugins(){
        // Hover over or click the Plugins menu to expand submenu
        await this.dashboard.pluginsMenu.hover();
        // Click on Installed Plugins link
        await this.dashboard.installedPluginsLink.click();
    }

    async navigateToDashboard(){
        await this.dashboard.dashboardButton.click();
    }

}