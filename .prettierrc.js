module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  printWidth: 120,
  useTabs: false,
  semi: true,
  singleQuote: false,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  arrowParens: 'always',
  jsxBracketSameLine: false,
  endOfLine: 'lf',
  "editor.formatOnSave": true,
  tailwindConfig: './tailwind.config.js',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
  plugins: ['prettier-plugin-tailwindcss'],
};
