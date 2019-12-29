import { Notification } from 'electron'

const reducer = {
  'app-ready': {
    title: 'Ready!',
    body: 'App Is Successfully Booted!',
    silent: true,
    click: item => item.close(),
  },
  'reactivating-window': {
    title: 'Reactivating Window Mode',
    body: 'Main Window Re-Opened.',
    silent: true,
    click: item => item.close(),
  },
  'closed-mode': {
    title: 'Hidden Mode',
    body: 'App Running While Window Is Closed',
    silent: true,
    click: item => item.close(),
  },
  'migration-refreshed': {
    title: 'Migration Refreshed',
    body: 'Success Refreshing Migration',
    log: console.log,
    click: item => item.close(),
  },
  'migration-refresh-failed': {
    title: 'Failed Migration Refresh',
    body: 'Failure Refreshing Migration',
    log: console.log,
    click: item => item.close(),
  },
  'migration-refresh-nulled': {
    title: 'No Refresh',
    body: 'No Refreshing',
    silent: true,
    log: console.log,
    click: item => item.close(),
  },
  'migration-rolledback': {
    title: 'Migration Refreshed',
    body: 'Success Rolling Back Migration',
    log: console.log,
    click: item => item.close(),
  },
  'migration-rollback-failed': {
    title: 'Failed Migration Rollback',
    body: 'Failure Rolling Back Migration',
    log: console.log,
    click: item => item.close(),
  },
  'migration-rollback-nulled': {
    title: 'No Rollback',
    body: 'No Rolling Back',
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

      if (typeof action.log === 'function') {
        action.log(log || action.body)
      }

      item.show()
    }
  },
}
