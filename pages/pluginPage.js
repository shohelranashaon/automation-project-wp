import { Plugin } from '../locators/locators';

export class PluginPage {
    constructor(page) {
        this.page = page;
        this.plugin = new Plugin(page);
    }

    // Navigate to Add Plugins page
    async addPluginButton() {
        await this.plugin.addPluginButton.click();
        await this.page.waitForURL(/plugin-install\.php/, { timeout: 30000 });
        await this.page.waitForLoadState('networkidle');
    }

    // Search plugin on Add Plugins page
    async searchPlugin(pluginName = "FlexTable") {
        await this.plugin.searchInput.waitFor({ state: 'visible', timeout: 30000 });
        await this.plugin.searchInput.fill(pluginName);
        await this.plugin.searchInput.press("Enter");
        await this.page.waitForTimeout(2000);
    }

    // LOOP 1: Find plugin in installed plugins list
    async findPlugin(pluginName = "FlexTable") {
        await this.page.waitForLoadState('networkidle');
        
        // Search for plugin if search box exists
        if (await this.plugin.pluginSearchInput.count() > 0) {
            await this.plugin.pluginSearchInput.fill(pluginName);
            await this.plugin.pluginSearchInput.press('Enter');
            await this.page.waitForTimeout(2000);
        }
        
        // Loop through all plugin rows
        const rows = await this.plugin.pluginTableRows.all();
        for (const row of rows) {
            const text = await row.textContent();
            if (text && text.includes(pluginName)) {
                return row;
            }
        }
        return null;
    }

    // Check if plugin is active
    async isActive(pluginRow) {
        if (!pluginRow) return false;
        const rowClass = await pluginRow.getAttribute('class');
        return rowClass && rowClass.includes('active');
    }

    // LOOP 2: Activate inactive plugin
    async activate(pluginRow) {
        if (!pluginRow || await this.isActive(pluginRow)) return false;
        
        const activateBtn = pluginRow.locator("a[href*='action=activate']").first();
        if (await activateBtn.count() > 0) {
            await activateBtn.click();
            await this.page.waitForLoadState('networkidle');
            await this.page.waitForTimeout(2000);
            return true;
        }
        return false;
    }

    // LOOP 3: Install and activate plugin
    async installAndActivate(pluginName = "FlexTable") {
        await this.addPluginButton();
        await this.searchPlugin(pluginName);
        
        // Install plugin
        const installBtn = this.plugin.installNowButton.first();
        if (await installBtn.count() > 0) {
            await installBtn.click();
            await this.page.waitForTimeout(5000);
            
            // Try to activate immediately after install
            if (await this.plugin.activateButtonAfterInstall.count() > 0) {
                await this.plugin.activateButtonAfterInstall.click();
                await this.page.waitForLoadState('networkidle');
                return true;
            }
            
            // If activate button not found, go to plugins page and activate
            await this.page.goto(this.page.url().split('/wp-admin/')[0] + '/wp-admin/plugins.php');
            await this.page.waitForLoadState('networkidle');
            const pluginRow = await this.findPlugin(pluginName);
            return await this.activate(pluginRow);
        }
        return false;
    }

    // Main method: Ensure plugin is active (handles all 3 scenarios)
    async ensurePluginIsActive(pluginName = "FlexTable") {
        await this.page.waitForLoadState('networkidle');
        
        // LOOP 1: Check if plugin exists
        const pluginRow = await this.findPlugin(pluginName);
        
        if (pluginRow) {
            // Plugin exists - check if active
            if (await this.isActive(pluginRow)) {
                return true; // Already active
            }
            // LOOP 2: Activate if inactive
            return await this.activate(pluginRow);
        } else {
            // LOOP 3: Install and activate if not installed
            return await this.installAndActivate(pluginName);
        }
    }

    // Verify plugin is active
    async verifyPluginIsActive(pluginName = "FlexTable") {
        await this.page.waitForLoadState('networkidle');
        const pluginRow = await this.findPlugin(pluginName);
        
        if (!pluginRow) {
            throw new Error(`${pluginName} plugin not found.`);
        }
        if (!(await this.isActive(pluginRow))) {
            throw new Error(`${pluginName} plugin is not active.`);
        }
        return true;
    }
}