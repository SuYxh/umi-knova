module.exports = {
  plugins: ['simple-import-sort'],
  extends: require.resolve('@umijs/max/eslint'),
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'off',
  }
};
