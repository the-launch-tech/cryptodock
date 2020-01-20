from abc import ABC, abstractmethod

class CryptoDockDataHandler(ABC) :

    def __init__(self, type) :
        self.klines = []
        self.tickers = []
        self.trades = []

    def get_data(self) :
        if type == 'live' :
            return self.get_live_data()
        elif type == 'backtest' :
            return self.get_backtest_data()

    @abstractmethod
    def find_signal(self) : pass

    @abstractmethod
    def get_live_data(self) : pass

    @abstractmethod
    def get_backtest_data(self) : pass
