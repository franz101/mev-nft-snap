module.exports = {
  extends: ['../../.eslintrc.js'],
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        'jsdoc/require-jsdoc': 0,
        "import/no-unassigned-import": 0
      },
    },
  ],

  ignorePatterns: ['!.eslintrc.js', 'build/'],
};
