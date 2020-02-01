from cryptodock import CryptoDockPortfolioManager
import datetime

class PortfolioManager(CryptoDockPortfolioManager) :
    """
    Manage building orders based on the state of your portfolio.
    Pass these orders to the execution queue.
    """

    def __init__(self, args) :
        super().__init__(args)

    # Required
    def build_order_constraints(self, signal) :
        """
        Return False or order to be queued for execution <object> {
            'order_type'
            'side'
            'size_min'
            'size_max'
            'base'
            'quote'
            'stp'
            'stop'
            'stop_price'
            'stop_time'
        }
        """
        if signal :
            return {
                'order_type': 'MARKET',
                'side': 'BUY',
                'size_min': 1,
                'size_max': 5,
                'base': 'BTC',
                'quote': 'USDC',
                'stp': '',
                'stop': False,
                'stop_price': False,
                'stop_time': False
            }
        else :
            return False
