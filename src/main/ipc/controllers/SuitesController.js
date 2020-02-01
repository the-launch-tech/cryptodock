import Strategy from '../../../common/models/Strategy'
import SuiteHandler from '../../../common/utilities/SuiteHandler'
import _key from '../../../common/helpers/_key'

const { log, error } = console
const channel = (key, id) => `res--${key}.suite-${id}`

export default {
  RUN_SUITE: (event, arg, win, key) => {
    Strategy.getOneByFieldValue({ key: 'id', value: arg.data.id })
      .then(data => {
        SuiteHandler(data, arg.data.suite, () => {
          event.reply(channel(key, 'RUN_SUITE'), {})
        })
      })
      .catch(error)
  },
}
