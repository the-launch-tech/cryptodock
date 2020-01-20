from ..cd import CryptoDockPortfolioManager

class PortfolioManager(CryptoDockPortfolioManager) :

    def __init__(self) :
        pass

    def build_order_constraints(self, signal) :
        return {}
