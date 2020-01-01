import { Notification } from 'electron'
import isFn from '../common/helpers/isFn'

const reducer = {
  APP_READY: {
    title: 'Ready!',
    body: 'App Is Successfully Booted!',
    silent: true,
    click: item => item.close(),
  },
  ALL_WINDOWS_CLOSED: {
    title: 'Hidden Mode',
    body: 'App Running While Window Is Closed',
    silent: true,
    click: item => item.close(),
  },
  MAIN_WINDOW_ACTIVATED: {
    title: 'Reactivating Window Mode',
    body: 'Main Window Re-Opened.',
    silent: true,
    click: item => item.close(),
  },
  STRATEGY_WINDOW_EXISTS: {
    title: 'Window Already Open For Selected Strategy',
    body: 'There is already a window open for the strategy you selected.',
    silent: true,
    click: item => item.close(),
  },
  MIGRATION_REFRESHED: {
    title: 'Migration Refreshed',
    body: 'Success Refreshing Migration',
    log: console.log,
    click: item => item.close(),
  },
  MIGRATION_REFRESH_FAILED: {
    title: 'Failed Migration Refresh',
    body: 'Failure Refreshing Migration',
    log: console.log,
    click: item => item.close(),
  },
  MIGRATION_REFRESH_NULLED: {
    title: 'No Refresh',
    body: 'No Refreshing',
    silent: true,
    log: console.log,
    click: item => item.close(),
  },
  MIGRATION_ROLLEDBACK: {
    title: 'Migration Refreshed',
    body: 'Success Rolling Back Migration',
    log: console.log,
    click: item => item.close(),
  },
  MIGRATION_ROLLBACK_FAILED: {
    title: 'Failed Migration Rollback',
    body: 'Failure Rolling Back Migration',
    log: console.log,
    click: item => item.close(),
  },
  MIGRATION_ROLLBACK_NULLED: {
    title: 'No Rollback',
    body: 'No Rolling Back',
    silent: true,
    log: console.log,
    click: item => item.close(),
  },
  STRATEGY_DIR_LINK_SET: {
    title: 'Sucess Setting Strategy Directory',
    body: 'The directory link for strategies has been set to the provided directory!',
    log: console.log,
    click: item => item.close(),
  },
  STRATEGY_DIR_LINK_NOT_SET: {
    title: 'No Directory Link Set Or Updated',
    body: 'Setting or updating the directory link failed for some reason!',
    silent: true,
    log: console.log,
    click: item => item.close(),
  },
}

export default {
  show: (id, log = null) => {
    const action = reducer[id]

    if (action && Notification.isSupported()) {
      const item = new Notification()

      item.title = action.title

      if (action.subtitle) {
        item.subtitle = action.subtitle
      }
      if (action.body) {
        item.body = action.body
      }
      if (action.silent) {
        item.silent = action.silent
      }
      if (action.icon) {
        item.icon = action.icon
      }
      if (action.hasReply) {
        item.hasReply = action.hasReply
      }
      if (action.replyPlaceholder) {
        item.replyPlaceholder = action.replyPlaceholder
      }
      if (action.sound) {
        item.sound = action.sound
      }
      if (action.actions) {
        item.actions = action.actions
      }

      item.closeButtonText = 'Close'

      item.click = () => action.click(item)

      if (isFn(action.log)) {
        action.log(log || action.body)
      }

      item.show()
    }
  },
}
