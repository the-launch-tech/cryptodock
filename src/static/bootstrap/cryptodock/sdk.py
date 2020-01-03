import requests
import sys

get_products = "/products"

class Sdk :

    def __init__(self) :
        self.port = str(sys.argv)[0]
        self.uri = "http://localhost:{}".format(5000)

    def get(endpoint, params = {}) :
        response = requests.get(self.uri + endpoint, params)
        return { code: response.status_code, data: response.json() }

    def get_products(self, exchanges = [], fields = []) :
        res = self.get(get_products, { exchanges: exchanges, fields: fields })
        return [res.code, res.data]
