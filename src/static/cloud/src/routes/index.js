import ProductsController from '../controllers/ProductsController'
import ExchangesController from '../controllers/ExchangesController'
import KlinesController from '../controllers/KlinesController'
import TickersController from '../controllers/TickersController'
import TradesController from '../controllers/TradesController'
import OrderBooksController from '../controllers/OrderBooksController'
import products from './products'
import exchanges from './exchanges'
import klines from './klines'
import tickers from './tickers'
import trades from './trades'
import orderbooks from './orderbooks'

export default Router => {
  products(Router, new ProductsController())
  exchanges(Router, new ExchangesController())
  klines(Router, new KlinesController())
  tickers(Router, new TickersController())
  trades(Router, new TradesController())
  orderbooks(Router, new OrderBooksController())
}
