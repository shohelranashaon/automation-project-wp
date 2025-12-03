import { test, expect } from '../../fixtures/authenticatedPage';
import { FlexTablePage } from '../../pages/FlexTablePage';
import { DashboardPage } from '../../pages/dashboardPage';  

test.describe.serial('FlexTable New Table Creation', () => {
    test('Create New Table Successfully', async ({ authenticatedPage }) => {
        // Use the page object for FlexTable flows
        const flexTable = new FlexTablePage(authenticatedPage);
        const dashboard = new DashboardPage(authenticatedPage);

        // Navigate to FlexTable dashboard and verify it loaded
        await flexTable.navigateToFlexTableDashboard();
        await flexTable.clickCreateNewTable();
        await flexTable.insertSheetUrl();
        await flexTable.clickCreateTableButton();
        await flexTable.inputTableName();
        await flexTable.inputTableDescription();
        await flexTable.clickSaveTableButton();
        await dashboard.navigateToDashboard(); 
        // TODO: add steps to create a new table (click create, fill fields, save, assert)
    });
});
