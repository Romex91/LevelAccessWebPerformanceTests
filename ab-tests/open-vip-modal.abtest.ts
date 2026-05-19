import { abTest } from 'shaka-shared';
import { waitUntilPageSettled } from 'shaka-perf/visreg/helpers';

// Interactive: open the "Join VIP List" modal from the top nav. The modal
// is a portal-rendered overlay, so this exercises a different render path
// (Material UI dialog) than the menu page itself — useful for catching
// UserWay overhead in dialogs/overlays.
abTest('Atlmenu — open Join VIP modal', {
  startingPath: '/atlmenu',
  experimentPathOverride: '/atlmenu?loadUserWay=true',
  testTypes: ['perf'],
}, async ({ page, annotate }) => {
  annotate('Wait for the VIP button to be ready');
  await page.waitForSelector('[data-cy="become-a-vip-navigation-bar"]', {
    state: 'visible',
    timeout: 30_000,
  });
  annotate('Click the Join VIP List button');
  await page.locator('[data-cy="become-a-vip-navigation-bar"]').click();
  annotate('Wait for the VIP modal to appear');
  await page.waitForSelector('div[role="dialog"], .MuiDialog-root', {
    state: 'visible',
    timeout: 15_000,
  });
  annotate('Wait for the modal contents to settle');
  await waitUntilPageSettled(page);
});
