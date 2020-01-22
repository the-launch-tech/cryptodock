import path from 'path'
import fs from 'fs'
import makeDir from '../helpers/makeDir'
import writeFile from '../helpers/writeFile'
import copyFile from '../helpers/copyFile'
import copyDir from '../helpers/copyDir'
import Strategy from '../models/Strategy'

const { log, error } = console

export default function(params, callback) {
  const { newStrategy, dirPath } = params
  const { name, label, description } = newStrategy
  const full_path = path.join(dirPath, name)
  const newJSON = path.join(full_path, '.cryptodock.config.json')
  const staticPy = path.join(__static, 'bootstrap')
  const newPy = full_path

  Strategy.save({ name, label, description, full_path })
    .then(insertId => {
      const jsonArray = [
        '{',
        '"id": ' + insertId + ',',
        '"name": "' + name + '",',
        '"label": "' + label + '",',
        '"description": "' + description + '",',
        '"full_path": "' + full_path + '",',
        '}',
      ]

      try {
        if (!fs.existsSync(full_path)) {
          makeDir(full_path, () => {
            copyDir(staticPy, newPy)
              .then(() => writeFile(newJSON, jsonArray.join('\n')))
              .then(() => global.StrategyWatcher.addNewStrategy(insertId))
              .then(() => callback(null, { id: insertId, name, label, description }))
              .catch(() => callback(true, null))
          })
        } else {
          global.StrategyWatcher.addNewStrategy(insertId)
          callback(null, { id: insertId, name, label, description })
        }
      } catch (e) {
        error(e)
      }
    })
    .catch(error)
}
