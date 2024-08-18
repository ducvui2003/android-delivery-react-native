// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
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
