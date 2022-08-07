module.exports = {
  ci: {
    upload: {
      target: "filesystem",
      outputDir: "./lhci_reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%",
      settings: {
        emulatedUserAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4695.0 Safari/537.36 Chrome-Lighthouse',
        formFactor: 'desktop',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        screenEmulation: {
          deviceScaleFactor: 1,
          disabled: false,
          height: 1080,
          mobile: false,
          width: 1920,
        },
        skipAudits: [
          'uses-http2',
          'is-on-https',
          'third-party-facades',
          'no-document-write', // 채널톡에서 사용
          'color-contrast',
          'meta-viewport',
        ],
        throttling: {
          cpuSlowdownMultiplier: 1,
          downloadThroughputKbps: 0,
          requestLatencyMs: 0,
          rttMs: 40,
          throughputKbps: 10 * 1024,
          uploadThroughputKbps: 0,
        },
      },
    },
    collect: {
      url: "http://localhost:3000",
    },
    /* assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "offscreen-images": "off",
        "color-contrast": "off",
        "tap-targets": "off",
      },
    }, */
  },
};
