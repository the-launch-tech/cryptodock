import Controller from './Controller'

class ExchangesController extends Controller {
  constructor() {
    super()

    this.get = this.get.bind(this)
  }

  get(req, res, next) {
    const { fields } = req.params
    const { name, id } = req.query

    res.json({ message: 'hooray! welcome to our api!' })
  }
}

export default ExchangesController
