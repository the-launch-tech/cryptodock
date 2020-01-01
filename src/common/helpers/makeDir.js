import fs from 'fs'

export default function(dir, cb) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  cb()
}
