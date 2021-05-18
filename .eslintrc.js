module.exports = {
  extends: [
    "plugin:prettier/recommended",
    "prettier/react",
    "kentcdodds",
    "kentcdodds/react",
    "kentcdodds/jsx-a11y",
  ],

  plugins: ["prettier", "simple-import-sort"],

  rules: {
    // simple import rules
    "simple-import-sort/exports": "warn",
    "simple-import-sort/imports": "warn",

    // react rules
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-unstable-nested-components": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/jsx-sort-props": [
      "warn",
      {
        reservedFirst: ["key"],
      },
    ],

    // various rules
    "no-void": "off",
    "require-await": "off",
    "max-lines-per-function": "off",
  },
};
