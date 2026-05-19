import { abTest } from 'shaka-shared';
import { waitUntilPageSettled } from 'shaka-perf/visreg/helpers';

// Non-interactive: cold page load. Just navigate and wait for the page to
// reach a quiescent state — this measures the baseline cost loadUserWay
// adds on top of the initial render.
abTest('Atlmenu — initial page load', {
  startingPath: '/atlmenu',
  experimentPathOverride: '/atlmenu?loadUserWay=true',
  testTypes: ['perf'],
}, async ({ page, annotate }) => {
  annotate('Wait for primary nav to render');
  await page.waitForSelector('nav', { state: 'visible', timeout: 30_000 });
  annotate('Wait for page to settle');
  await waitUntilPageSettled(page);
});
