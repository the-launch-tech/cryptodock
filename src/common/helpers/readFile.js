const fs = require('fs')

export default function(file, split) {
  return new Promise((res, rej) => {
    fs.readFile(file, (e, d) => {
      e && rej(e)
      split ? res(d.toString().split('\n')) : res(d.toString())
    })
  })
}
