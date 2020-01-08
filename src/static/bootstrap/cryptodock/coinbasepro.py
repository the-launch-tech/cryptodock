import requests

class CoinbasePro :

    def __init__(self, uri) :
        self.uri = uri

    def get(self, endpoint, params = {}) :
        response = requests.get(self.uri + '/coinbasepro' + endpoint, params)
        return response.json() if response.status_code > 199 and response.status_code < 300 else False
