import cryptodock
import sys

sdk = cryptodock.Sdk()

"""
GET exchanges from local data store examples:
"""
e1 = sdk.local.get_exchanges()
print(e1)
"""
[
RowDataPacket {
    id: 1,
    name: 'kucoin',
    label: 'Kucoin',
    created: 2020-01-07T00:21:08.000Z
},
RowDataPacket {
    id: 2,
    name: 'coinbasepro',
    label: 'CoinbasePro',
    created: 2020-01-07T00:21:08.000Z
}
]
"""

e2 = sdk.local.get_exchanges(fields='name')
print(e2)
"""
[
RowDataPacket { name: 'coinbasepro' },
RowDataPacket { name: 'kucoin' }
]
"""

e3 = sdk.local.get_exchanges(names=["coinbasepro"])
print(e3)
"""
[
RowDataPacket {
    id: 2,
    name: 'coinbasepro',
    label: 'CoinbasePro',
    created: 2020-01-07T00:21:08.000Z
}
]
"""

e4 = sdk.local.get_exchanges(fields=['name','id'],names="kucoin")
print(e4)
"""
[
RowDataPacket {
    name: 'kucoin',
    id: 1
}
]
"""

e5 = sdk.local.get_exchanges(names=["coinbasepro", "kcin"])
print(e5)
"""
[
RowDataPacket {
    id: 2,
    name: 'coinbasepro',
    label: 'CoinbasePro',
    created: 2020-01-07T00:21:08.000Z
}
]
"""


"""
GET products from local data store examples:
"""
p1 = sdk.local.get_products()
print(p1)
p2 = sdk.local.get_products(exchanges=['kucoin', 'coinbasepro'])
print(p2)
p3 = sdk.local.get_products(exchanges='coinbasepro')
print(p3)
p4 = sdk.local.get_products(pairs='BTC-USDT')
print(p4)
p5 = sdk.local.get_products(pairs=['BTC-USDT','ETH-USDT'])
print(p5)
"""
[
...
RowDataPacket {
    id: 1,
    trading: 1,
    margin: 0,
    iceberg: null,
    oco: null,
    spot_trading: null,
    base_min: 0.1,
    base_max: 10000000000,
    quote_min: 0.00001,
    quote_max: 99999999,
    created: 2020-01-07T00:21:08.000Z,
    exchange_id: 1,
    product_id: 100,
    pair: 'DRGN-BTC',
    base: 'DRGN',
    quote: 'BTC',
    name: 'kucoin',
    label: 'Kucoin'
},
... 400 more items
]
"""

p6 = sdk.local.get_products(fields=['id','pair','base','quote','base_min','base_max'],exchanges=['coinbasepro'])
print(p6)
"""
[
...
RowDataPacket {
    id: 499,
    pair: 'ETH-EUR',
    base: 'ETH',
    quote: 'EUR',
    base_min: 0.01
},
RowDataPacket {
    id: 500,
    pair: 'LTC-GBP',
    base: 'LTC',
    quote: 'GBP',
    base_min: 0.1
}
]
"""
