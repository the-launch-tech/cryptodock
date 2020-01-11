// We need to handle:
// Calling the backtest server to start a test
// Listen for results from the server
// Poll the server if the app re-opens to see if there was a completed test
class BacktestManager {
  constructor() {
    this.queue = {}
  }

  initialize() {}

  runNewTest(data) {
    return true
  }
}

export default BacktestManager
