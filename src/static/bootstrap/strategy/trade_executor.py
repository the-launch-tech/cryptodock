from cryptodock import CryptoDockTradeExecutor

class TradeExecutor(CryptoDockTradeExecutor) :
    """
    On each EXECUTE event the execution queue is processed and the execute method is called on the queued order.
    Manage your order execution based on an orderbook snapshot, or another technique of your choice.
    """

    def __init__(self, args) :
        super().__init__(args)

    # Required
    def execute(self) :
        return {
            "id": "d0c5340b-6d6c-49d9-b567-48c4bfca13d2",
            "price": "0.10000000",
            "size": "0.01000000",
            "product_id": "BTC-USD",
            "side": "buy",
            "stp": "dc",
            "type": "limit",
            "time_in_force": "GTC",
            "post_only": False,
            "created_at": "2016-12-08T20:02:28.53864Z",
            "fill_fees": "0.0000000000000000",
            "filled_size": "0.00000000",
            "executed_value": "0.0000000000000000",
            "status": "pending",
            "settled": False
        }
