import chalk from 'chalk'
import { spawn } from 'child_process'

const { log, error } = console

export function bootShell(stateObj, sysArgs) {
  const uint8arrayToString = data => String.fromCharCode.apply(null, data)

  if (stateObj.process && !stateObj.process.killed) {
    stateObj.process.kill('SIGHUP')
  }

  stateObj.process = spawn(process.env.PYTHONPATH, sysArgs)
  stateObj.process.stdout.on('data', results => log(chalk.blue(uint8arrayToString(results))))
  stateObj.process.stderr.on('data', e => error(chalk.red(uint8arrayToString(e))))
  stateObj.process.on('exit', code => log(chalk.gray('Process quit with code : ' + code)))
}

export function deBootShell(stateObj) {
  if (stateObj && stateObj.process) {
    stateObj.process.kill('SIGHUP')
  }
}
