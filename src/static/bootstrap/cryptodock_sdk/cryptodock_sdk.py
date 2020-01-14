from .controllers import CoinbasePro, Kucoin, Local
import sys

class CryptoDockSdk :

    def __init__(self) :
        # self.port = sys.argv[1]
        self.port = 5000
        self.uri = "http://localhost:{}/api/v1".format(self.port)

        self.Local = Local(self.uri)
        self.Kucoin = Kucoin(self.uri)
        self.CoinbasePro = CoinbasePro(self.uri)
