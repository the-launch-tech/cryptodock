import path from 'path'
import makeDir from '../helpers/makeDir'
import writeFile from '../helpers/writeFile'
import copyFile from '../helpers/copyFile'
import copyDir from '../helpers/copyDir'

const { log, error } = console

export default function(params, callback) {
  const { newStrategy, dirPath } = params
  const { name, label, description } = newStrategy
  const fullDirPath = path.join(dirPath, name)
  const newJSON = path.join(fullDirPath, '.cryptodock.config.json')
  const staticPy = path.join(__static, 'bootstrap')
  const newPy = fullDirPath

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
        copyDir(staticPy, newPy)
          .then(() => writeFile(newJSON, jsonArray.join('\n')))
          .then(() => callback(null, { id, name, label, description }))
          .catch(() => callback(true, null))
      })
    }
  )
}
