import { Notification } from 'electron'
import isFn from '../../common/helpers/isFn'
import reducer from './reducer'

export default {
  show: (action, log = null) => {
    const args = reducer[action]

    if (args && Notification.isSupported()) {
      const item = new Notification()

      item.title = args.title

      if (args.subtitle) {
        item.subtitle = args.subtitle
      }
      if (args.body) {
        item.body = args.body
      }
      if (args.silent) {
        item.silent = args.silent
      }
      if (args.icon) {
        item.icon = args.icon
      }
      if (args.hasReply) {
        item.hasReply = args.hasReply
      }
      if (args.replyPlaceholder) {
        item.replyPlaceholder = args.replyPlaceholder
      }
      if (args.sound) {
        item.sound = args.sound
      }
      if (args.actions) {
        item.actions = args.actions
      }

      item.closeButtonText = 'Close'

      item.click = () => args.click(item)

      if (isFn(args.log)) {
        args.log(log || args.body)
      }

      item.show()
    }
  },
}
