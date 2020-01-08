from websocket import create_connection

class Socket :

    def __init__(self) :
        websocket.enableTrace(True)
        self.conns = []

    def create_conn(self, name) :
        self.conns[name] = websocket.WebSocketApp(
            "ws://echo.websocket.org/",
            on_message = self.on_message,
            on_error = self.on_error,
            on_close = self.on_close
        )
        self.conns[name].on_open = self.on_open
        self.conns[name].run_forever()

    def on_message(self, ws, message):
        print('onmessage', ws, message)

    def on_error(self, ws, error):
        print('onerror', ws, error)

    def on_close(self, ws):
        print('onclose', ws)

    def on_open(self, ws):
        def run(*args):
            for i in range(3):
                time.sleep(1)
                ws.send("Hello %d" % i)
            time.sleep(1)
            ws.close()
            print("thread terminating...")
        thread.start_new_thread(run, ())
