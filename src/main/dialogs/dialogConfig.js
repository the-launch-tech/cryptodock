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
  changeDirConfirm: arg => {
    return {
      type: 'question',
      title: 'Change Directory',
      message: 'Are you sure you want to change the current strategy directory?',
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
  strategyDelete: arg => {
    return {
      type: 'question',
      title: 'Delete Strategy',
      message: 'Are your sure you want to delete this strategy?',
      detail: 'The files will not be deleted automatically.',
      defaultId: 1,
      buttons: ['Yes', 'No'],
    }
  },
}
