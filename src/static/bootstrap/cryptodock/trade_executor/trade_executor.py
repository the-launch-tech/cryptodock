from abc import ABC, abstractmethod

class CryptoDockTradeExecutor(ABC) :

    def __init__(self) :
        self.executable = False

    def is_executable(self) :
        return self.executable

    @abstractmethod
    def execute(self) : pass
