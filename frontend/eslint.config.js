import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import vueparser from 'vue-eslint-parser';
import tsparser from '@typescript-eslint/parser';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueparser,
      parserOptions: {
        parser: tsparser,
      },
    },
    plugins: { vue: pluginVue },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
    },
  }
);
