export const bindings = [
  'manage',
  'initialize',
  'activateSession',
  'deActivateSession',
  'getAndPrepare',
  'setStrategyState',
  'bootStrategyById',
  'deBootStrategyById',
  'onStartTrading',
  'onHeartbeat',
  'onFinishedTrading',
]

export const isEnabled = type => {
  if (type === 'live') {
    return (
      process.env.PYTHONPATH &&
      process.env.REMOTE_DB_HOST &&
      process.env.REMOTE_PORT &&
      process.env.REMOTE_VERSION &&
      process.env.TRADING_SOCKET_HOST &&
      process.env.TRADING_SOCKET_PORT
    )
  } else if (type === 'backtest') {
    return (
      process.env.PYTHONPATH &&
      process.env.REMOTE_DB_HOST &&
      process.env.REMOTE_PORT &&
      process.env.REMOTE_VERSION &&
      process.env.BACKTEST_SOCKET_HOST &&
      process.env.BACKTEST_SOCKET_PORT
    )
  } else {
    return false
  }
}
