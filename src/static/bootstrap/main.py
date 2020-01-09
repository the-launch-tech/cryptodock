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

e3 = sdk.local.get_exchanges(name=["coinbasepro"])
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

e4 = sdk.local.get_exchanges(fields=['name','id'],name="kucoin")
print(e4)
"""
[
RowDataPacket {
    name: 'kucoin',
    id: 1
}
]
"""

e5 = sdk.local.get_exchanges(name=["coinbasepro", "kcin"])
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
