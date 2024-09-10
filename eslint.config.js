import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import stylistic from "@stylistic/eslint-plugin";

export default [
  stylistic.configs["recommended-flat"],
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  { "files": ["**/*.{js,mjs,cjs,vue,ts}"] },
  {
    "plugins": {
      "@stylistic": stylistic,
    },
    "languageOptions": { "globals": globals.browser },
    "rules": {
      "vue/multi-word-component-names": "off",
      "indent": ["error", 2, { "SwitchCase": 1 }],
      "linebreak-style": ["error", "unix"],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/quote-props": "off",
      "@stylistic/comma-dangle": "off",
      "@stylistic/semi": ["error", "always"],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/brace-style": ["error", "1tbs", { "allowSingleLine": true }],
      "function-call-argument-newline": ["error", "never"],
      "vue/require-default-prop": "off",
    },
  },
];
