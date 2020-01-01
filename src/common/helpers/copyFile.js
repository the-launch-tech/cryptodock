import fs from 'fs'

export default function(oldFile, newFile) {
  return new Promise((res, rej) => {
    fs.copyFile(oldFile, newFile, err => {
      if (err) rej(err)
      res()
    })
  })
}
