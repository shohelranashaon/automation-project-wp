import { test, expect } from '../../fixtures/authenticatedPage';
import { DashboardPage } from '../../pages/dashboardPage';
import { PluginPage } from '../../pages/pluginPage';

test.describe.serial('WordPress Dashboard Tests', () => {
    test('Verify FlexTable Plugin Activation Status', async ({ authenticatedPage }) => {
        const dashboardPage = new DashboardPage(authenticatedPage);
        await dashboardPage.navigateToInstalledPlugins();
        
        const pluginPage = new PluginPage(authenticatedPage);
        
        // Ensure plugin is active (handles: active, inactive, or not installed)
        await pluginPage.ensurePluginIsActive('FlexTable');
        
        // Verify plugin is active and visible
        const isActive = await pluginPage.verifyPluginIsActive('FlexTable');
        expect(isActive).toBe(true);
    });
});