export default key => {
  global.Windows.activate(key, () => {
    global.Windows.onClosed(key, global.IPC.removeHandlers)
  })
}
