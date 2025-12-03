import { test, expect } from '../../fixtures/authenticatedPage';
import { FlexTablePage } from '../../pages/FlexTablePage';

test.describe.serial('FlexTable Dashboard Tests', () => {
    test('Verify FlexTable Dashboard', async ({ authenticatedPage }) => {
        const flexTablePage = new FlexTablePage(authenticatedPage);
        await flexTablePage.navigateToFlexTableDashboard();
        await flexTablePage.verifyFlexTableDashboard();
        // await authenticatedPage.pause();
    });
});
