export default {
  coinbasepro: {
    getProducts: 'getProducts',
    getKLinePeriod: 'getProductHistoricRates',
    product: 'id',
    object: {
      pair: 'id',
      base: 'base_currency',
      quote: 'quote_currency',
      base_min: 'base_min_size',
      base_max: 'base_max_size',
      quote_min: 'quote_increment',
    },
    klineArr: [0, 1, 2, 3, 4, 5],
    klinePeriod: {
      60: 60,
      300: 300,
      900: 900,
      3600: 3600,
    },
  },
  kucoin: {
    getProducts: 'getProducts',
    getKLinePeriod: 'getKlines',
    product: 'symbol',
    object: {
      pair: 'symbol',
      base: 'baseCurrency',
      quote: 'quoteCurrency',
      base_min: 'baseMinSize',
      base_max: 'baseMaxSize',
      quote_min: 'quoteMinSize',
      quote_max: 'quoteMaxSize',
      margin: 'isMarginEnabled',
      trading: 'enableTrading',
    },
    klineArr: [0, 3, 4, 2, 1, 6],
    klinePeriod: {
      60: '1min',
      300: '5min',
      900: '15min',
      3600: '1hour',
    },
  },
}