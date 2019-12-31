import readFile from '../../common/helpers/readFile'

const error = console.error

export default {
  static: function(fileDir, cb) {
    readFile(fileDir, false)
      .then(contents => contents.replace(/(\r\n|\n|\r)/gm, ' '))
      .then(contents => contents.replace(/\s+/g, ' '))
      .then(contents => contents.trim())
      .then(contents => global.Pool.asyncQuery(contents, cb))
      .catch(error)
  },
}
