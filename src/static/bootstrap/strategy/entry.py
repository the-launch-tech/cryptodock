from cryptodock import CryptoDockBacktest, CryptoDockArgs
from data_handler import DataHandler
from portfolio_manager import PortfolioManager
from trade_executor import TradeExecutor
from fill_storage import FillStorage
from main import Main
import sys

"""
Load sys args from parent NodeJS process
"""
Args = CryptoDockArgs(sys.argv)

if Args.TYPE == 'live' :
    """
    If live trading initialize strategy
    """

    Strategy = Main(
        args=Args,
        data_handler=DataHandler,
        portfolio_manager=PortfolioManager,
        trade_executor=TradeExecutor,
        fill_storage=FillStorage
    )
    Strategy.listen()
elif Args.TYPE == 'backtest' :
    """
    If backtest use backtest wrapper to initialize strategy
    """

    backtest = CryptoDockBacktest(
        strategy=Main,
        args=Args,
        data_handler=DataHandler,
        portfolio_manager=PortfolioManager,
        trade_executor=TradeExecutor,
        fill_storage=FillStorage
    )
    backtest.start_test()
