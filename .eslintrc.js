module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'global-require': 'off',
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'no-restricted-globals': 'off'
  }
}
