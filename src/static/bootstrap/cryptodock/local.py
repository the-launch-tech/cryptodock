import requests

class Local :

    def __init__(self, uri) :
        self.uri = uri

    def get(self, endpoint, params = {}) :
        response = requests.get(self.uri + '/local' + endpoint, params)
        return response.json() if response.status_code > 199 and response.status_code < 300 else False

    def get_exchanges(self, exchanges) :
        return self.get("/exchanges", {
            'exchanges': exchanges,
        })

    def get_products(self, pairs, exchanges, fields) :
        return self.get("/products", {
            'pairs': pairs,
            'exchanges': exchanges,
            'fields': fields
        })

    def get_tickers(self, pairs, exchanges, fields, start = False, end = False, granularity = 3600, limit = -1) :
        return self.get("/tickers", {
            'pairs': pairs,
            'exchanges': exchanges,
            'fields': fields,
            'start': start,
            'end': end,
            'granularity': granularity,
            'limit': limit
        })


    def get_trades(self, pairs, exchanges, fields, start = False, end = False, granularity = 3600, limit = -1) :
        return self.get("/trades", {
            'pairs': pairs,
            'exchanges': exchanges,
            'fields': fields,
            'start': start,
            'end': end,
            'granularity': granularity,
            'limit': limit
        })

    def get_klines(self, pairs, exchanges, fields, start = False, end = False, granularity = 3600, limit = -1) :
        return self.get("/klines", {
            'pairs': pairs,
            'exchanges': exchanges,
            'fields': fields,
            'start': start,
            'end': end,
            'granularity': granularity,
            'limit': limit
        })
