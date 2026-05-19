import * as os from 'node:os';
import { defineConfig } from 'shaka-perf/compare';

// Both sides hit the same origin; per-test `startingPath` and
// `experimentPathOverride` carry the actual URL difference
// (`/atlmenu` vs `/atlmenu?loadUserWay=true`).
const TARGET_ORIGIN = 'https://ap-smokehouse.popmenu.com';

const PARALLELISM = Math.max(1, Math.floor(os.cpus().length / 2));

// Cable-broadband-shaped throttling — CPU slowdown does most of the
// heavy lifting to keep the loadUserWay-vs-control delta visible while
// the link stays close to what a real desktop visitor would see.
const LIGHTHOUSE_CONFIG = {
  throttling: {
    rttMs: 40,
    throughputKbps: 30720,
    requestLatencyMs: 150,
    downloadThroughputKbps: 27648,
    uploadThroughputKbps: 5000,
    cpuSlowdownMultiplier: 2,
  },
  throttlingMethod: 'devtools' as const,
  logLevel: 'error' as const,
  output: 'html' as const,
  onlyCategories: ['performance'],
};

export default defineConfig({
  shared: {
    controlURL: TARGET_ORIGIN,
    experimentURL: TARGET_ORIGIN,
    parallelism: PARALLELISM,
    retries: 4,
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
