import Controller from './Controller'
import Exchange from '../models/Exchange'
import Product from '../models/Product'
import Trade from '../models/Trade'
import Ticker from '../models/Ticker'
import KLine from '../models/KLine'

class LocalController extends Controller {
  constructor() {
    super()
  }

  /*
   * Get Exchanges
   * @param name <[<string>]> [optional]
   * @param fields <obj name, label, etc...> [optional]
   */
  getExchanges(req, res, next) {
    const { fields, name } = req.params

    res.json({ message: 'getExchanges' })
  }

  /*
   * Get Products
   * @param pair <[<string>]> [optional]
   * @param fields <obj pair, base, quote, etc...> [optional]
   */
  getProducts(req, res, next) {
    const { pair, fields } = req.params

    res.json({ message: 'getProducts' })
  }

  /*
   * Get Klines
   * @param pair <[<string>]>
   * @param fields <obj name, label, etc...> [optional]
   * @param start <datetime> [optional]
   * @param end <datetime> [optional]
   * @param granularity <int> [optional]
   * @param limit <int> [optional]
   */
  getKlines(req, res, next) {
    const { pair, fields, start, end, granularity } = req.params

    res.json({ message: 'getKlines' })
  }

  /*
   * Get Tickers
   * @param pair <[<string>]>
   * @param fields <obj name, label, etc...> [optional]
   * @param start <datetime> [optional]
   * @param end <datetime> [optional]
   * @param granularity <int> [optional]
   * @param limit <int> [optional]
   */
  getTickers(req, res, next) {
    const { pair, fields, start, end, granularity } = req.params

    res.json({ message: 'getTickers' })
  }

  /*
   * Get Trades
   * @query pair <[<string>]>
   * @param fields <obj name, label, etc...> [optional]
   * @param start <datetime> [optional]
   * @param end <datetime> [optional]
   * @param granularity <int> [optional]
   * @param limit <int> [optional]
   */
  getTrades(req, res, next) {
    const { pair, fields, start, end, granularity } = req.params

    res.json({ message: 'getTrades' })
  }
}

export default LocalController
