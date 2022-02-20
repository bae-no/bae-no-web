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
  ignorePatterns: ["**/*.config.js", "**/*.setup.js", "**/*.eslintrc.js"],
  rules: {
    "@typescript-eslint/quotes": "off",
    "react/function-component-definition": "off",
    "@typescript-eslint/comma-dangle": "off",
    "import/prefer-default-export": "off",
    "operator-linebreak": "off",
    "react/jsx-props-no-spreading": "off",
    "@typescript-eslint/indent": "off",
  },
};
