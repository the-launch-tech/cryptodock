from .local import Local
from .kucoin import Kucoin
from .coinbasepro import CoinbasePro
from . import version

import sys

class Sdk :

    def __init__(self) :
        # self.port = sys.argv[1]
        self.port = 5000
        self.uri = "http://localhost:{}/api/v1".format(self.port)

        self.local = Local(self.uri)
        self.kucoin = Kucoin(self.uri)
        self.coinbasepro = CoinbasePro(self.uri)
