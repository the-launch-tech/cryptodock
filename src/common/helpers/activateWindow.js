export default key => {
  global.Windows.activate(key, () => {
    global.Conn.connection.connect()
    global.Windows.onClosed(key, global.IPC.removeHandlers)
  })
}
