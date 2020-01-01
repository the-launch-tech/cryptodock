import mainWindowRoutes from './routes/mainWindowRoutes'
import strategyWindowRoutes from './routes/strategyWindowRoutes'

export default function(type, id = null, key) {
  const reducer = {
    mainWindow: mainWindowRoutes,
    strategyWindow: strategyWindowRoutes,
  }

  const action = reducer[type]

  return action(key)
}
