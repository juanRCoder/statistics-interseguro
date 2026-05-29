import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import vueparser from 'vue-eslint-parser';
import tsparser from '@typescript-eslint/parser';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'eslint.config.js'],
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueparser,
      parserOptions: {
        parser: tsparser,
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: { vue: pluginVue },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
    },
  }
);
