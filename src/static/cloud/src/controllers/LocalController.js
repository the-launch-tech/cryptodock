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
   * @query name <[<string>]> [optional]
   * @param fields <obj name, label, etc...> [optional]
   */
  getExchanges(req, res, next) {
    const { name, fields } = req.query
    Exchange.get(name, fields)
      .then(data => res.json(data))
      .catch(err => super.err(res, 500, err))
  }

  /*
   * Get Products
   * @param pair <[<string>]> [optional]
   * @param fields <obj pair, base, quote, etc...> [optional]
   */
  getProducts(req, res, next) {
    Product.get(req.params)
      .then(data => res.json(data))
      .catch(err => super.err(res, 500, err))
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
    KLine.get(req.params)
      .then(data => res.json(data))
      .catch(err => super.err(res, 500, err))
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
    Ticker.get(req.params)
      .then(data => res.json(data))
      .catch(err => super.err(res, 500, err))
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
    Trade.get(req.params)
      .then(data => res.json(data))
      .catch(err => super.err(res, 500, err))
  }
}

export default LocalController
