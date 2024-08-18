// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    "prettier",
  ],
  plugins: ["prettier", "@typescript-eslint"],
  rules: {
    "no-warning-comments": "off",   // Disables the rule that warns about specific comment types like TODO or FIXME
    "spaced-comment": "off",         // Disables the rule that enforces spacing after comment markers
    "multiline-comment-style": "off", // Disables the rule that enforces a consistent style for multiline comments
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "no-irregular-whitespace": "off",
    "@typescript-eslint/ban-types": "off",
    "prettier/prettier": ["warn",
      {
        "arrowParens": "avoid",
        "semi": true,
        "endOfLine": "lf",
        "printWidth": 100,
        "singleQuote": false,
        "jsxSingleQuote": false,
        "trailingComma": "es5",
      },
    ],
  },
};
