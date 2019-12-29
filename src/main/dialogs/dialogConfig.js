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
}
