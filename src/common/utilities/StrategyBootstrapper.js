import fs from 'fs'
import path from 'path'
import makeDir from '../helpers/makeDir'
import writeFile from '../helpers/writeFile'
import copyFile from '../helpers/copyFile'

const { log, error } = console

export default function(params, callback) {
  const { newStrategy, dirPath } = params
  const { name, label, description } = newStrategy
  const fullDirPath = path.join(dirPath, name)
  const newJSON = path.join(fullDirPath, 'cryptodock.config.json')
  const staticPy = path.join(__static, 'main.py')
  const newPy = path.join(fullDirPath, 'main.py')

  global.Conn.asyncQuery(
    'INSERT INTO strategies (name, label, description, full_path) values ("' +
      name +
      '", "' +
      label +
      '", "' +
      description +
      '", "' +
      fullDirPath +
      '")',
    (err, data) => {
      if (err) throw err

      const id = data.insertId

      const jsonArray = [
        '{',
        '"id": ' + id + ',',
        '"name": "' + name + '",',
        '"label": "' + label + '",',
        '"description": "' + description + '",',
        '"full_path": "' + fullDirPath + '",',
        '}',
      ]

      makeDir(fullDirPath, () => {
        writeFile(newJSON, jsonArray.join('\n'))
          .then(() => copyFile(staticPy, newPy))
          .then(() => callback(null, { id, name, label, description }))
          .catch(() => callback(true, null))
      })
    }
  )
}
