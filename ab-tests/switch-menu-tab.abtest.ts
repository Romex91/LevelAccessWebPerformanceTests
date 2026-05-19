import { abTest } from 'shaka-shared';
import { waitUntilPageSettled } from 'shaka-perf/visreg/helpers';

// Interactive: switch from the default (Pizza) menu to the Breakfast menu.
// This is a real client-side navigation between menus, so we measure how
// loadUserWay affects responsiveness once the page is already warm.
abTest('Atlmenu — switch to Breakfast menu', {
  startingPath: '/atlmenu',
  experimentPathOverride: '/atlmenu?loadUserWay=true',
  testTypes: ['perf'],
}, async ({ page, annotate }) => {
  annotate('Wait for menu toggles to be ready');
  await page.waitForSelector('.pm-menu-toggle-breakfast-menu', {
    state: 'visible',
    timeout: 30_000,
  });
  annotate('Click the Breakfast Menu toggle');
  await page.locator('.pm-menu-toggle-breakfast-menu').click();
  annotate('Wait for the toggle to become active');
  await page.waitForSelector('.pm-menu-toggle-breakfast-menu.active', {
    state: 'visible',
    timeout: 15_000,
  });
  annotate('Wait for the new menu content to settle');
  await waitUntilPageSettled(page);
});
