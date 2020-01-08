import Controller from './Controller'
import Kucoin from '../clients/Kucoin'
import exchangeMap from '../utils/exchangeMap'

class KucoinController extends Controller {
  constructor() {
    super()
  }

  get(req, res, next) {
    const { pair, fields, start, end, granularity } = req.params

    res.json({ message: 'get' })
  }
}

export default KucoinController
