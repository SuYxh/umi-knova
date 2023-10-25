module.exports = {
  plugins: ['simple-import-sort'],
  extends: require.resolve('@umijs/max/eslint'),
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  }
};
