import path from 'path'
import chalk from 'chalk'
import { spawn } from 'child_process'

const { log, error } = console

export default function(strategy, args, callback) {
  const uint8arrayToString = data => String.fromCharCode.apply(null, data)

  const childProcess = spawn(process.env.PYTHONPATH, [
    path.join(strategy.full_path, '/suite/entry.py'),
    strategy,
    args,
  ])

  childProcess.stdout.on('data', results => log(chalk.blue(uint8arrayToString(results))))
  childProcess.stderr.on('data', e => error(chalk.red(uint8arrayToString(e))))
  childProcess.on('exit', code => log(chalk.gray('Process quit with code : ' + code)))

  callback()
}
