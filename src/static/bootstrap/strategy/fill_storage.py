from cryptodock import CryptoDockFillStorage

class FillStorage(CryptoDockFillStorage) :
    """
    Manages fill history.
    Maintains list of open orders, and fills.
    This information can be used to cancel open orders, or reference orders and fills during the DataHandling phase.
    """

    def __init__(self, args) :
        super().__init__(args)
