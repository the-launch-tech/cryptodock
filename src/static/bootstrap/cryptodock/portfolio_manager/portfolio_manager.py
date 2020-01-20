from abc import ABC, abstractmethod

class CryptoDockPortfolioManager(ABC) :

    def __init__(self) : pass

    @abstractmethod
    def build_order_constraints(self, signal) : pass

    @abstractmethod
    def update(self, results) : pass
