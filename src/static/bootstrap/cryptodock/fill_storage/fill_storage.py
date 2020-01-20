from abc import ABC, abstractmethod

class CryptoDockFillStorage(ABC) :

    def __init__(self) :
        self.storage = []

    def store(self, signal, order, data) :
        pass
