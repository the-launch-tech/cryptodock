from ..cd import CryptoDockApi, CryptoDockBacktest, CryptoDockStrategy, CryptoDockArgs
from . import DataHandler, PortfolioManager, TradeExecutor, FillStorage
import sys

"""
CYCLE:

=> On Heartbeat
    1. DataHandler - Run algorithms against data to check for signal
        a. Ignore
        b. Send to PortfolioManager
    2. PortfolioManager - Check if portfolio aligns with signal
        a. Ignore
        b. Send to TradeExecutor
    3. TradeExecutor - Use orderbook knowledge and trade detail knowledge to best execute trade
    4. FillStorage - Store results for backpropagation and analysis in future signal identification
Next Heartbeat =>
"""

Args = CryptoDockArgs(sys.argv)

Api = CryptoDockApi(Args)

class Main(CryptoDockStrategy) :

    def __init__(self) :
        self.granularity = 60
        self.DataHandler = DataHandler()
        self.PortfolioManager = PortfolioManager()
        self.TradeExecutor = TradeExecutor()
        self.FillStorage = FillStorage()
        super().__init__(Args)

    def next_heartbeat(self) :
        super().next_heartbeat()
        data = self.DataHandler.get_data(Args.TYPE)
        signal = self.DataHandler.find_signal()
        if signal :
            order = self.PortfolioManager.build_order_constraints(signal)
            if self.TradeExecutor.is_executable(order) :
                results = self.TradeExecutor.execute(order)
                if results.success :
                    self.FillStorage.store(signal, order, results)
                    self.PortfolioManager.update(self.FillStorage.storage[-1])

if Args.TYPE == 'live' :
    Strategy = Main()
    Strategy.listen()
elif Args.TYPE == 'backtest' :
    Strategy = Main()
    backtest = CryptoDockBacktest(Strategy, Args)
    backtest.start_test()
