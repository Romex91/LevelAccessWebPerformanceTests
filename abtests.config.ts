import * as os from 'node:os';
import { defineConfig } from 'shaka-perf/compare';

// Both sides hit the same origin; per-test `startingPath` and
// `experimentPathOverride` carry the actual URL difference
// (`/atlmenu` vs `/atlmenu?loadUserWay=true`).
const TARGET_ORIGIN = 'https://ap-smokehouse.popmenu.com';

const PARALLELISM = Math.max(1, Math.floor(os.cpus().length / 2));

// Mobile-shaped throttling — modest CPU slowdown and a slow link so the
// loadUserWay-vs-control delta has room to surface above run-to-run noise.
const LIGHTHOUSE_CONFIG = {
  throttling: {
    rttMs: 150,
    throughputKbps: 1638.4,
    requestLatencyMs: 562.5,
    downloadThroughputKbps: 1474.56,
    uploadThroughputKbps: 675,
    cpuSlowdownMultiplier: 4,
  },
  throttlingMethod: 'simulate' as const,
  logLevel: 'error' as const,
  output: 'html' as const,
  onlyCategories: ['performance'],
};

export default defineConfig({
  shared: {
    controlURL: TARGET_ORIGIN,
    experimentURL: TARGET_ORIGIN,
    parallelism: PARALLELISM,
    retries: 1,
    // Public site over the network: be generous so Lighthouse's slowest
    // samples don't get killed by the worker race-timeout.
    timeoutMs: 180000,
  },

  perf: {
    numberOfMeasurements: 10,
    lighthouseConfig: LIGHTHOUSE_CONFIG,
    // Desktop only — keeps wall time reasonable for a 4-test comparison
    // and matches what a typical UserWay accessibility-overlay user sees.
    viewports: ['desktop'],
  },

  // Audit is mandatory but we don't need a separate config block to override
  // its defaults for this comparison.
  audit: {
    lighthouseConfig: LIGHTHOUSE_CONFIG,
    viewports: ['desktop'],
  },
});
