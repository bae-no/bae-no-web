module.exports = {
  ci: {
    upload: {
      target: "filesystem",
      outputDir: "./lhci_reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%",
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
