import Strategy from '../../../common/models/Strategy'
import _key from '../../../common/helpers/_key'

const { log, error } = console
const channel = (key, id) => `res--${key}.activity-${id}`

export default {
  RECENT: (event, arg, win, key) => {
    Strategy.getRecent({ after: arg.data.after })
      .then(data => event.reply(channel(key, 'RECENT'), data))
      .catch(error)
  },
}
