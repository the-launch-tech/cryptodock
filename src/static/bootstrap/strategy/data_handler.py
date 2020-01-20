from ..cd import CryptoDockDataHandler

class DataHandler(CryptoDockDataHandler) :

    def __init__(self, type) :
        self.signal = False
        super().__init__(type)

    def find_signal(self) :
        return True

    def get_live_data(self) :
        return {
            'klines': self.klines,
            'tickers': self.tickers,
            'trades': self.trades
        }

    def get_backtest_data(self) :
        return {
            'klines': self.klines,
            'tickers': self.tickers,
            'trades': self.trades
        }
