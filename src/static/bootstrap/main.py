import cryptodock
import sys
import datetime

sdk = cryptodock.Sdk()

# """
# GET exchanges from local data store examples:
# """
# e1 = sdk.local.get_exchanges()
# print(e1)
# """
# [
# RowDataPacket {
#     id: 1,
#     name: 'kucoin',
#     label: 'Kucoin',
#     created: 2020-01-07T00:21:08.000Z
# },
# RowDataPacket {
#     id: 2,
#     name: 'coinbasepro',
#     label: 'CoinbasePro',
#     created: 2020-01-07T00:21:08.000Z
# }
# ]
# """
#
# e2 = sdk.local.get_exchanges(fields='name')
# print(e2)
# """
# [
# RowDataPacket { name: 'coinbasepro' },
# RowDataPacket { name: 'kucoin' }
# ]
# """
#
# e3 = sdk.local.get_exchanges(names=["coinbasepro"])
# print(e3)
# """
# [
# RowDataPacket {
#     id: 2,
#     name: 'coinbasepro',
#     label: 'CoinbasePro',
#     created: 2020-01-07T00:21:08.000Z
# }
# ]
# """
#
# e4 = sdk.local.get_exchanges(fields=['name','id'],names="kucoin")
# print(e4)
# """
# [
# RowDataPacket {
#     name: 'kucoin',
#     id: 1
# }
# ]
# """
#
# e5 = sdk.local.get_exchanges(names=["coinbasepro", "kcin"])
# print(e5)
# """
# [
# RowDataPacket {
#     id: 2,
#     name: 'coinbasepro',
#     label: 'CoinbasePro',
#     created: 2020-01-07T00:21:08.000Z
# }
# ]
# """
#
#
# """
# GET products from local data store examples:
# """
# p1 = sdk.local.get_products()
# print(p1)
# p2 = sdk.local.get_products(exchanges=['kucoin', 'coinbasepro'])
# print(p2)
# p3 = sdk.local.get_products(exchanges='coinbasepro')
# print(p3)
# p4 = sdk.local.get_products(pairs='BTC-USDT')
# print(p4)
# p5 = sdk.local.get_products(pairs=['BTC-USDT','ETH-USDT'])
# print(p5)
# """
# [
# ...
# RowDataPacket {
#     id: 1,
#     trading: 1,
#     margin: 0,
#     iceberg: null,
#     oco: null,
#     spot_trading: null,
#     base_min: 0.1,
#     base_max: 10000000000,
#     quote_min: 0.00001,
#     quote_max: 99999999,
#     created: 2020-01-07T00:21:08.000Z,
#     exchange_id: 1,
#     product_id: 100,
#     pair: 'DRGN-BTC',
#     base: 'DRGN',
#     quote: 'BTC',
#     name: 'kucoin',
#     label: 'Kucoin'
# },
# ... 400 more items
# ]
# """
#
# p6 = sdk.local.get_products(fields=['id','pair','base','quote','base_min','base_max'],exchanges=['coinbasepro'])
# print(p6)
# """
# [
# ...
# RowDataPacket {
#     id: 499,
#     pair: 'ETH-EUR',
#     base: 'ETH',
#     quote: 'EUR',
#     base_min: 0.01
# },
# RowDataPacket {
#     id: 500,
#     pair: 'LTC-GBP',
#     base: 'LTC',
#     quote: 'GBP',
#     base_min: 0.1
# }
# ]
# """
#
# k1 = sdk.local.get_tickers()
# print(k1)
# k2 = sdk.local.get_tickers(exchanges="coinbasepro")
# print(k2)
# """
# [
# RowDataPacket {
#     id: 73975,
#     server_time: 2020-01-09T20:40:56.000Z,
#     sequence: 1573462723629,
#     price: 0.0000378,
#     size: 63.5926,
#     bid: 0.0000369,
#     ask: 0.0000389,
#     volume: null,
#     created: 2020-01-09T20:40:57.000Z,
#     exchange_id: 1,
#     product_id: 127
# },
# ... 59204 more items
# ]
# """
#
# k3 = sdk.local.get_tickers(
#     exchanges=["kucoin"],
#     pairs=["BTC-USDT","ETH-USDT"],
#     fields="price"
# )
# print(k3)
# """
# [
# ... 100 more
# RowDataPacket {
#     price: 139.47,
#     server_time: 2020-01-08T21:22:24.000Z
# },
# RowDataPacket {
#     price: 8005.4,
#     server_time: 2020-01-08T21:22:24.000Z
# },
# RowDataPacket {
#     price: 139.41,
#     server_time: 2020-01-08T21:17:57.000Z
# },
# RowDataPacket {
#     price: 7999.3,
#     server_time: 2020-01-08T21:17:57.000Z
# },
# ... 150 more items
# ]
# """
#
# k4 = sdk.local.get_tickers(
#     exchanges=["kucoin"],
#     pairs=["BTC-USDT","ETH-USDT"],
#     fields=["price","size","bid","ask","pair","id","name"],
#     start=datetime.datetime(2020, 1, 6),
#     end=datetime.datetime.now(),
#     limit=50
# )
# print(k4)
# """
# [
# ... 48 more
#   RowDataPacket {
#     price: 141.23,
#     size: 0.0004495,
#     bid: 141.22,
#     ask: 141.23,
#     pair: 'ETH-USDT',
#     id: 62768,
#     name: 'kucoin'
#   },
#   RowDataPacket {
#     price: 8085.5,
#     size: 0.0122441,
#     bid: 8085.4,
#     ask: 8085.6,
#     pair: 'BTC-USDT',
#     id: 62769,
#     name: 'kucoin'
#   }
# ]
# """
#
# k5 = sdk.local.get_tickers(
#     exchanges=["kucoin", "coinbasepro"],
#     pairs="BTC-USDT",
#     fields=["price","pair","sequence","name"],
#     start=datetime.datetime(2020, 1, 5),
#     end=datetime.datetime.now(),
#     limit=-1,
#     order='ASC'
# )
# print(k5)
# """
# [
# ... 97 more
#   RowDataPacket {
#     price: 8335.3,
#     pair: 'BTC-USDT',
#     sequence: 1568644910004,
#     name: 'kucoin',
#     server_time: 2020-01-08T06:00:43.000Z
#   },
#   RowDataPacket {
#     price: 8331,
#     pair: 'BTC-USDT',
#     sequence: 1568644932524,
#     name: 'kucoin',
#     server_time: 2020-01-08T06:06:53.000Z
#   },
#   RowDataPacket {
#     price: 8339.5,
#     pair: 'BTC-USDT',
#     sequence: 1568644962786,
#     name: 'kucoin',
#     server_time: 2020-01-08T06:14:32.000Z
#   },
#   ... 56 more items
# ]
# """
