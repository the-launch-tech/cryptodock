from cryptodock import CryptoDockStrategy

class Main(CryptoDockStrategy) :
    """
    Main class for your strategy.
    The base class contains the event flow and crucial business logic.
    For more complex strategies this class can be leveraged to support interactions and sharing between the event classes.
    Feel free to override base class methods.
    """

    def __init__(self, args, data_handler, portfolio_manager, trade_executor, fill_storage) :
        super().__init__(
            args=args,
            data_handler=data_handler,
            portfolio_manager=portfolio_manager,
            trade_executor=trade_executor,
            fill_storage=fill_storage
        )

    def on_find(self, signal=None, time=None) :
        signal = self.data_handler.get_data_and_signal(time)
        super().on_find(signal=signal, time=time)

    def on_build(self, handle_signal=None) :
        def handle_signal_callback(signal) :
            return self.portfolio_manager.build_order_constraints(signal)
        super().on_build(handle_signal=handle_signal_callback)

    def on_execute(self, handle_execution=None) :
        def handle_execution_callback(pending_order) :
            return self.trade_executor.execute(pending_order)
        super().on_execute(handle_execution=handle_execution_callback)

    def on_audit(self) : pass

    def on_store(self, handle_store=None) :
        def handle_store_callback(filled_order) :
            self.fill_storage.store(filled_order)
        super().on_store(handle_store=handle_store_callback)
