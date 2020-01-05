import RequestBalancer from '../RequestBalancer'
import Product from '../../models/Product'
import exchangeMap from '../../clients/exchangeMap'

const { log, error } = console

export default function(exchangeId, exchangeName, Client) {
  const map = exchangeMap[exchangeName]

  const getProducts = () => {
    return new Promise((resolve, reject) => {
      if (exchangeName === 'coinbasepro') {
        Client.getProducts()
          .then(resolve)
          .catch(reject)
      } else if (exchangeName === 'kucoin') {
        Client.getSymbolsList()
          .then(res => resolve(res.data))
          .catch(reject)
      }
    })
  }

  const siftUnique = (arrOne = [], arrTwo = [], callback) => {
    let uniqueArr = []

    arrOne.map(elOne => {
      let unique = true
      arrTwo.map(elTwo => {
        if (elOne[map.product] === elTwo.pair) {
          unique = false
        }
      })
      if (unique) {
        uniqueArr.push(elOne)
      }
    })

    callback(uniqueArr)
  }

  RequestBalancer.request(
    retry =>
      getProducts()
        .then(exchangeProducts => {
          Product.getExchangeProducts(exchangeId)
            .then(localProducts => {
              siftUnique(exchangeProducts, localProducts, uniqueProducts => {
                uniqueProducts.map(product => {
                  Product.save(exchangeId, product, map.object)
                    .then(log)
                    .catch(error)
                })
              })
            })
            .catch(error)
        })
        .catch(error),
    exchangeName,
    exchangeName
  ).catch(error)
}
