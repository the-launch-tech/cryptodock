import RequestBalancer from '../RequestBalancer'
import Product from '../../../models/Product'
import exchangeMap from '../../../clients/exchangeMap'

export default function(exchangeId, exchangeName, Client) {
  let map = exchangeMap[exchangeName]
  const getProducts = Client[map.getProducts]

  const siftUnique = (arrOne, arrTwo, callback) => {
    let uniqueArr = []

    arrOne.map(elOne => {
      let unique = true
      arrTwo.map(elTwo => {
        if (elOne[map.product] === elTwo.pair) {
          unique = false
        }
      })
      if (unique) {
        unique.push(elOne)
      }
    })

    callback(uniqueArr)
  }

  RequestBalancer.request(
    retry =>
      getProducts(exchangeProducts => {
        Product.getAll().then(localProducts => {
          siftUnique(localProducts, exchangeProducts, uniqueProducts => {
            uniqueProducts.map(product => Product.save(exchangeId, product, map.object))
          })
        })
      }),
    exchangeName,
    exchangeName
  )
}
