from cd import CryptoDockApi, CryptoDockBacktest, CryptoDockStrategy, CryptoDockArgs
import sys
import json

"""
Breakdown arguments from nodejs child_process
"""
Args = CryptoDockArgs(sys.argv)

"""
Initialize API SDK for exchange data

Packages:
    Local: Locally stored historic data from exchanges. Normalized naming conventions and fields
    Kucion: Kucoin API interface. Normalized naming conventions
    CoinbasePro: CoinbasePro API interface. Normalized naming conventions
"""
Api = CryptoDockApi(Args)

"""
Example strategy implementation

Required Parameters:
    Args:
        default: Object
        description: Contains the sys.argv passed on the initiation of the nodejs child_process
Optional parameters:
    granularity:
        default: 60 seconds
        description: How often should the websocket PING the strategy to run a cycle on exchange data
Required super Methods:
    next:
        description: Entry point for cycle. This is called at <granularity> second periods and starts off the strategy process on the current data
    listen:
        description: Called at the begining of the trading session to mount the websocket connection and start the <granularity> second cycles
"""
class Main(CryptoDockStrategy) :

    def __init__(self) :
        self.granularity = 60
        super().__init__(Args)

    def next(self) :
        super().next()

    def listen(self) :
        super().listen()

if Args.TYPE == 'live' :
    Strategy = Main()
    Strategy.listen()
elif Args.TYPE == 'backtest' :
    """
    Example running of a backtester
        description: The backtester wraps the written strategy and uses the <next> lifecycle hook to test against locally stored historic data.
        parameters:
            Strategy:
                description: The written strategy, initilized but latent
            Paramters Object:
                parameters: start (datetime), end (datetime), granularity (int)
                description: The parameters that define the constraints of the backtest
        methods:
            start_test:
                description: Starts the backtest class
    """
    Strategy = Main()
    backtest = CryptoDockBacktest(Strategy, {
        'start': datetime.datetime(),
        'end': datetime.datetime(),
        'granularity': 60
    })
    backtest.start_test()
