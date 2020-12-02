const { readFileSync } = require('fs')
const { resolve } = require('path')

module.exports = filename =>
  readFileSync(resolve(process.mainModule.path, filename), 'utf8').split(/\r?\n/)
