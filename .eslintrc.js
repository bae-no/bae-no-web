module.exports = {
  extends: [
    "next",
    "airbnb",
    "airbnb-typescript",
    "plugin:react/jsx-runtime",
    "prettier",
  ],
  plugins: ["react", "@typescript-eslint"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["**/*.js", "**/*.d.ts"],
  rules: {
    "@typescript-eslint/quotes": "off",
    "react/function-component-definition": "off",
    "@typescript-eslint/comma-dangle": "off",
    "import/prefer-default-export": "off",
    "operator-linebreak": "off",
    "react/jsx-props-no-spreading": "off",
    "@typescript-eslint/indent": "off",
    "implicit-arrow-linebreak": "off",
    "react/require-default-props": "off",
    "object-curly-newline": "off",
    "consistent-return": "off",
  },
};
