from ..utils import StrategyState, StrategySocket
from abc import ABC, abstractmethod
import websocket
import json
import datetime

class CryptoDockStrategy(ABC) :

    def __init__(self, Args) :
        self.port = Args.TRADING_SOCKET_PORT
        self.host = Args.TRADING_SOCKET_HOST
        self.strategy = json.loads(Args.STRATEGY)
        self.id = self.strategy['id']
        self.granularity = 60
        self.results = {
            'status': StrategyState.LATENT,
            'meta': {},
            'sequence': []
        }
        super().__init__()

    @abstractmethod
    def next_heartbeat(self) :
        self.results['sequence'].append(datetime.datetime.now())
        self.ws.send(StrategySocket.PING(self.id))

    def listen(self) :
        websocket.enableTrace(True)
        self.ws = websocket.WebStrategySocketApp(
            StrategySocket.URL(self.host, self.port, self.id),
            on_message=self.ws_message,
            on_error=self.ws_error,
            on_close=self.ws_close
        )
        self.ws.on_open = self.ws_open
        self.results['status'] = StrategyState.ACTIVE
        self.ws.run_forever()

    def ws_open(self) :
        self.ws.send(StrategySocket.START_TRADING(self.id))

    def ws_message(self, message) :
        if message == 'POLL_TRADING' :
            self.server_poll()
        elif message == 'FINISH_TRADING' :
            self.server_finish()
        elif message == 'TRADING_RESOLVED' :
            self.server_resolved()
        else :
            if self.results['status'] == StrategyState.ACTIVE :
                self.next_heartbeat()
            else :
                self.handle_non_active_state()

    def ws_error(self, error) : pass

    def ws_close(self) : pass

    def server_poll(self) :
        self.ws.send(StrategySocket.ACTIVE_POLL(self.id, self.results))

    def server_finish(self) :
        self.ws.send(StrategySocket.FINISHED_TRADING(self.id, self.results))
        self.results['status'] = StrategyState.LATENT

    def server_resolved(self) :
        self.destroy()

    def destroy(self) :
        self.results['status'] = StrategyState.RESOLVED
        self.ws.close()
        self.ws = None

    def handle_non_active_state(self) :
        self.ws.send(StrategySocket.LATENT_POLL(self.id, self.results))

    def send_log_message(self, message) :
        self.ws.send(StrategySocket.LOG_MESSAGE(self.id, message))
