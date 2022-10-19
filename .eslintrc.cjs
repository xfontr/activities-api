module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ["airbnb-base", "prettier"],
  // parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "import/extensions": "off",
  },
};
