export default {
  migrationConfirmation: arg => {
    return {
      type: 'question',
      title: 'Migration Confirmation',
      message: 'Are you sure you want to ' + arg.id + '?',
      detail: 'This action cannot be reversed',
      defaultId: 1,
      buttons: ['Yes', 'No'],
    }
  },
  getStrategyDirectory: arg => {
    return {
      title: 'Set Strategy Dock Directory For Python Strategies',
      defaultPath: '',
      buttonLabel: 'Choose Directory',
      properties: ['openDirectory'],
      message: 'This is the directory which all your strategies will reside',
      securityScopedBookmarks: false,
    }
  },
}
