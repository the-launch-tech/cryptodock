import requests

class Kucoin :

    def __init__(self, uri) :
        self.uri = uri

    def get(self, endpoint, params = {}) :
        response = requests.get(self.uri + '/kucoin' + endpoint, params)
        return response.json() if response.status_code > 199 and response.status_code < 300 else False

    def get_order_book(self, pair, level, depth) :
        return self.get("/orderbook", {
            'pair': pair,
            'level': level,
            'depth': depth
        })
