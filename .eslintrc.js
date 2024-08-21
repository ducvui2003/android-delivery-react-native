// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    // "prettier",
  ],
  plugins: [
    // "prettier",
    "@typescript-eslint",
    "unused-imports"
  ],
  rules: {
    "no-warning-comments": "off",   // Disables the rule that warns about specific comment types like TODO or FIXME
    "spaced-comment": "off",         // Disables the rule that enforces spacing after comment markers
    "multiline-comment-style": "off", // Disables the rule that enforces a consistent style for multiline comments
    "@typescript-eslint/no-require-imports": "off",
    "no-irregular-whitespace": "off",
    "@typescript-eslint/ban-types": "off",
    // "prettier/prettier": ["warn",
    //   {
    //     "arrowParens": "avoid",
    //     "semi": true,
    //     "endOfLine": "lf",
    //     "printWidth": 100,
    //     "singleQuote": false,
    //     "jsxSingleQuote": false,
    //     "trailingComma": "es5",
    //   },
    // ],
   "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
        "warn",
        {
            "vars": "all",
            "varsIgnorePattern": "^_",
            "args": "after-used",
            "argsIgnorePattern": "^_",
        },
    ]
  },
};
