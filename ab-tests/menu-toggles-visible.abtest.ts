import { abTest } from 'shaka-shared';
import { waitUntilPageSettled } from 'shaka-perf/visreg/helpers';

// Non-interactive: scroll to bring the menu-toggle row into view and wait
// for any below-the-fold menu content to fully render. UserWay can mutate
// styles on the toggles, so the cost of the page reaching this fully-laid-
// out state is what we want to measure.
abTest('Atlmenu — scroll to menu toggles', {
  startingPath: '/atlmenu',
  experimentPathOverride: '/atlmenu?loadUserWay=true',
  testTypes: ['perf'],
}, async ({ page, annotate }) => {
  annotate('Wait for the active menu toggle to mount');
  await page.waitForSelector('.pm-menu-toggle.active', {
    state: 'visible',
    timeout: 30_000,
  });
  annotate('Scroll the menu toggle into view');
  await page.locator('.pm-menu-toggle.active').scrollIntoViewIfNeeded();
  annotate('Wait for the page to settle after scroll');
  await waitUntilPageSettled(page);
});
