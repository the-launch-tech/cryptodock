import cryptodock

sdk = cryptodock.Sdk()

products = sdk.get_products(['CoinbasePro', 'Kucoin'])

print(products)
