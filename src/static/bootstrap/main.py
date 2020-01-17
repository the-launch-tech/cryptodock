from cryptodock import CryptoDockApi, CryptoDockBacktest, CryptoDockStrategy
import sys
import json

API_HOST = sys.argv[1]
API_PORT = sys.argv[2]
API_VERSION = sys.argv[3]
TRADING_SOCKET_HOST = sys.argv[4]
TRADING_SOCKET_PORT = sys.argv[5]
TYPE = sys.argv[6]
STRATEGY = sys.argv[7]

class Main(CryptoDockStrategy) :

    def __init__(self, strategy) :
        super().__init__(TRADING_SOCKET_PORT)
        self.granularity = 60
        self.strategy = json.loads(strategy)

    def next(self) :
        pass

    def listen(self) :
        pass


Api = CryptoDockApi(
    base=HOST,
    port=PORT,
    version=VERSION
)

if TYPE == 'live' :
    Strategy = Main(STRATEGY)
    Strategy.listen()
elif TYPE == 'backtest' :
    Strategy = Main(STRATEGY)
    backtest = CryptoDockBacktest(Strategy, {
        'start': datetime.datetime(),
        'end': datetime.datetime(),
        'granularity': 60
    })
    backtest.start_test()
