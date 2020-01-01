const { log, error } = console

export default {
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
    log,
    click: item => item.close(),
  },
  MIGRATION_REFRESH_FAILED: {
    title: 'Failed Migration Refresh',
    body: 'Failure Refreshing Migration',
    log,
    click: item => item.close(),
  },
  MIGRATION_REFRESH_NULLED: {
    title: 'No Refresh',
    body: 'No Refreshing',
    silent: true,
    log,
    click: item => item.close(),
  },
  MIGRATION_ROLLEDBACK: {
    title: 'Migration Refreshed',
    body: 'Success Rolling Back Migration',
    log,
    click: item => item.close(),
  },
  MIGRATION_ROLLBACK_FAILED: {
    title: 'Failed Migration Rollback',
    body: 'Failure Rolling Back Migration',
    log,
    click: item => item.close(),
  },
  MIGRATION_ROLLBACK_NULLED: {
    title: 'No Rollback',
    body: 'No Rolling Back',
    silent: true,
    log,
    click: item => item.close(),
  },
  STRATEGY_DIR_LINK_SET: {
    title: 'Sucess Setting Strategy Directory',
    body: 'The directory link for strategies has been set to the provided directory!',
    log,
    click: item => item.close(),
  },
  STRATEGY_DIR_LINK_NOT_SET: {
    title: 'No Directory Link Set Or Updated',
    body: 'Setting or updating the directory link failed for some reason!',
    silent: true,
    log,
    click: item => item.close(),
  },
}
