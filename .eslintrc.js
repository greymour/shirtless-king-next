module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "./"],
      },
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    "react",
    "react-hooks",
    "prettier",
    "@typescript-eslint",
    "simple-import-sort",
    // 'tailwindcss'
  ],
  extends: [
    "airbnb",
    "airbnb-typescript",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    // 'plugin:tailwindcss/recommended'
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    // "import/no-absolute-path": "off",
    // 'tailwindcss/classnames-order': 'warn',
    // 'tailwindcss/no-custom-classname': 'warn',
    // 'tailwindcss/no-contradicting-classname': 'error',
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".tsx", ".ts"] }],
    "react/destructuring-assignment": "off",
    indent: "off",
  },
};
