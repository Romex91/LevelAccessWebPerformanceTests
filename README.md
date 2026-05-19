# level_access_performance_tests

Performance comparison between the AP Smokehouse Atlanta menu page with and
without the UserWay accessibility overlay loaded:

- **Control:** https://ap-smokehouse.popmenu.com/atlmenu
- **Experiment:** https://ap-smokehouse.popmenu.com/atlmenu?loadUserWay=true

## Tests

| Test                        | Type            | What it measures |
|----------------------------|-----------------|------------------|
| `page-load.abtest.ts`       | non-interactive | Cold load to settle |
| `menu-toggles-visible.abtest.ts` | non-interactive | Scroll-to-view + settle |
| `switch-menu-tab.abtest.ts` | interactive     | Click Breakfast menu toggle |
| `open-vip-modal.abtest.ts`  | interactive     | Open the Join VIP dialog |

## Install

`shaka-perf` and `shaka-shared` are pulled from the npm registry. Local
fixes to those packages live in `patches/` and are applied automatically
by `patch-package` on `postinstall`.

```bash
yarn install
yarn compare
```
