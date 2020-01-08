from .local import Local
from .kucoin import Kucoin
from .coinbasepro import CoinbasePro
from .socket import Socket
from . import version

import sys

class Sdk :

    def __init__(self) :
        # self.port = sys.argv[1]
        self.port = 5000
        self.uri = "http://localhost:{}/api/{}".format(self.port, version)

        self.local = Local(self.uri)
        self.kucoin = Kucoin(self.uri)
        self.coinbasepro = CoinbasePro(self.uri)
        self.socket = Socket()
