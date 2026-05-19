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
yarn compare            # runs shaka-perf compare
```

To silence the tsx-ESM fallback warning the patch suppresses, set
`SHAKAPERF_DEBUG_CONFIG_LOAD=1` to re-enable the original stack trace
for debugging.

## Bumping shaka-perf / shaka-shared

Edit the `^0.1.0` ranges in `package.json` and re-run `yarn install`.
If the `patches/shaka-perf+0.1.0.patch` file no longer applies cleanly
against a newer version, delete it and the warning returns — it's
suppression-only, not load-bearing.
