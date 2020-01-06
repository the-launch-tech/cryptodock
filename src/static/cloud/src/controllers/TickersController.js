import Controller from './Controller'

class TickersController extends Controller {
  constructor() {
    super()

    this.get = this.get.bind(this)
  }

  get(req, res, next) {
    const { pair, fields, start, end, granularity } = req.params

    res.json({ message: 'hooray! welcome to our api!' })
  }
}

export default TickersController
