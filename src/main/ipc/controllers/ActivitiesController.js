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
  RECENT_BY_ID: (event, arg, win, key) => {
    Strategy.getRecentById({ id: arg.data.id, after: arg.data.after })
      .then(data => event.reply(channel(key, 'RECENT_BY_ID'), data))
      .catch(error)
  },
}
