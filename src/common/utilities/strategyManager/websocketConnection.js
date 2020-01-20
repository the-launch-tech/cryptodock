import Cron from 'node-cron'
import querystring from 'querystring'

const { log, error } = console

export default function({ ws, req, state, reducer }) {
  const { id } = querystring.parse(req.url.substr(2))

  state[id].socket = ws

  state[id].ticker = Cron.schedule('*/10 * * * * *', () => state[id].socket.send('NEXT_TICK'), {
    scheduled: false,
  })

  state[id].socket.on('message', data => {
    data = JSON.parse(data)
    if (state[data.id]) {
      const action = reducer[data.command]
      action(data)
    }
  })
}
