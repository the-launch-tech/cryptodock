import Controller from './Controller'

class ProductsController extends Controller {
  constructor() {
    super()

    this.get = this.get.bind(this)
  }

  get(req, res, next) {
    const { pair, fields } = req.params

    res.json({ message: 'hooray! welcome to our api!' })
  }
}

export default ProductsController
