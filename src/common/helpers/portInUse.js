import net from 'net'

export default function(port, callback) {
  const server = net.createServer(socket => {
    socket.write('Echo server\r\n')
    socket.pipe(socket)
  })

  server.listen(port, '127.0.0.1')
  server.on('error', e => callback(true))
  server.on('listening', e => {
    server.close()
    callback(false)
  })
}
