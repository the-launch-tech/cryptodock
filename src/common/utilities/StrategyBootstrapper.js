import fs from 'fs'
import path from 'path'
import makeDir from '../helpers/makeDir'
import writeFile from '../helpers/writeFile'
import copyFile from '../helpers/copyFile'

const { log, error } = console

export default function(params, callback) {
  const { slug, dirPath } = params
  const fullDirPath = path.join(dirPath, slug)
  const newJSON = path.join(fullDirPath, 'cryptodock.config.json')
  const staticPy = path.join(__static, 'main.py')
  const newPy = path.join(fullDirPath, 'main.py')

  global.Conn.asyncQuery('INSERT INTO strategies (name) values ("' + slug + '")', (err, data) => {
    if (err) throw err

    const id = data.insertId

    const jsonArray = [
      '{',
      '"id": ' + id + ',',
      '"name": "' + slug + '",',
      '"label": "",',
      '"description": "",',
      '"exchanges": [],',
      '"products": []',
      '}',
    ]

    makeDir(fullDirPath, () => {
      writeFile(newJSON, jsonArray.join('\n'))
        .then(() => copyFile(staticPy, newPy))
        .then(() => callback(null, { id, slug }))
        .catch(() => callback(true, null))
    })
  })
}
