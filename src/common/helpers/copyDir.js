import fs from 'fs-extra'

export default function(oldFile, newFile) {
  return new Promise((res, rej) => {
    fs.copy(oldFile, newFile, err => {
      if (err) rej(err)
      res()
    })
  })
}
