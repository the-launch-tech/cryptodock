import fs from 'fs'

export default function(file, text, flag) {
  return new Promise((res, rej) => {
    fs.writeFile(file, text, { flag }, e => {
      if (e) rej(e)
      res('Success Writing File')
    })
  })
}
