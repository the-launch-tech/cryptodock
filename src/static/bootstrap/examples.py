import cryptodock
import sys

sdk = cryptodock.Sdk()

local_exchanges = sdk.local.get_exchanges()

if (local_exchanges) :

    local_products = sdk.local.get_products(exchanges=local_exchanges)

    if (local_products) :
        first_product = local_products[0]['pair']

        local_tickers = sdk.local.get_tickers(
            pairs=[first_product],
            exchanges=['coinbasepro']
        )
        kucoin_orderbook = sdk.kucoin.get_order_book(
            pairs=[first_product],
            level=2,
            depth=100
        )

        print(local_tickers)
        print(kucoin_orderbook)

    else :
        print('No Products!')

else :
    print('No Exchanges!')
