from cryptodock import CryptoDockDataHandler
from cryptodock_api import CryptoDockApi
import datetime

class DataHandler(CryptoDockDataHandler) :
    """
    Handles finding trading signals from data of your choice.
    """

    def __init__(self, args) :
        self.Api = CryptoDockApi(args)
        super().__init__(args)

    # Optional
    def get_data_and_signal(self, time = None) :
        """
        Combines required methods get_data and find_signal.
        """

        data = self.get_data(time)
        signal = self.find_signal(data)
        self.datas.append({'time': time, 'data': data})
        if (signal) :
            self.signals.append({'time': time, 'signal': signal})
            return signal
        return False

    # Required
    def find_signal(self, data) :
        """
        Returns trading signal to be queued for order building, or False
        returns Signal <object> {
            'pair': 'BTC-USDT',
            'exchange': 'coinbasepro',
            'time': time,
            'direction': 'LONG',
            'weight': 0.3
        }
        """

        product = max(
            data,
            key=lambda product:product['stat']['high'] / product['stat']['low'] ** product['stat']['volume']
        )

        return {
            'exchange': 'coinbasepro',
            'pair': product['product']['pair'],
            'time': datetime.datetime.now(),
            'direction': 1 if product['stat']['high'] - product['stat']['open'] > product['stat']['open'] - product['stat']['low'] else -1,
            'weight': 1
        }

    # Required
    def get_live_data(self, time) :
        """
        Get data for live environment
        """

        data = {}
        products = self.Api.local.get_products(exchanges="coinbasepro")

        for product in products :
            data.append({
                'product': product,
                'stat': self.Api.coinbasepro.get_product_24_hour_stats()
            })

        return data

    # Required
    def get_backtest_data(self, time) :
        """
        Get data for backtesting environment
        """

        return {
            'klines': [],
            'tickers': [],
            'trades': []
        }
