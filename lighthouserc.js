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
  },
};
