#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const helpers = require('./helpers')
const log = console.log
const error = console.error

program.version('0.0.1', '-v, --vers', 'Current CryptoDockCLI Version')

program
  .command('addvar <newKey> <newValue>')
  .description('Add credentials for CryptoDock utilities')
  .action((newKey, newValue) => {
    helpers
      .readFile('.env', true)
      .then(fileArr => {
        helpers
          .readLine('.env', newKey)
          .then(value => helpers.replaceLine(fileArr, newKey, value, newValue))
          .then(newFileArr => helpers.writeFile('.env', null, newFileArr.join('\n'), null))
          .then(() => log(chalk.blue('New Environment Var Written: ' + newKey + '=' + newValue)))
          .catch(error)
      })
      .catch(error)
  })

program.parse(process.argv)
