import path from 'path'
import readFile from '../../common/helpers/readFile'

export default {
  static: function(path, cb) {
    readFile(path.join(__dirname, path), false)
      .then(contents => {
        global.Pool.getConnection((err, conn) => {
          if (err) throw err
          conn.query(contents, [], cb)
        })
      })
      .catch(error)
  },
}
