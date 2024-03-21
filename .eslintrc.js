/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: "@vinicius1313/eslint-config",
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
}
