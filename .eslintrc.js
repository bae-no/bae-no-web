module.exports = {
  extends: [
    "next/core-web-vitals",
    "airbnb",
    "airbnb-typescript",
    "plugin:react/jsx-runtime",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  ignorePatterns: ["**/*.config.js", "**/*.eslintrc.js"],
  rules: {
    "@typescript-eslint/quotes": "off",
    "react/function-component-definition": "off",
  },
};
