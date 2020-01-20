from abc import ABC
import json
from . import CryptoDockHelpers

class StrategySocket(ABC) :

    @staticmethod
    def URL(host, port, id) :
        return 'ws://{}:{}?id={}'.format(host, port, id)

    @staticmethod
    def PING(id) :
        return json.dumps({'command': 'PING', 'id': id}, default=CryptoDockHelpers.json_serial)

    @staticmethod
    def START_TRADING(id) :
        return json.dumps({'command': 'START_TRADING', 'id': id}, default=CryptoDockHelpers.json_serial)

    @staticmethod
    def ACTIVE_POLL(id, results) :
        return json.dumps({'command': 'ACTIVE_POLL', 'results': results, 'id': id}, default=CryptoDockHelpers.json_serial)

    @staticmethod
    def FINISHED_TRADING(id, results) :
        return json.dumps({'command': 'FINISHED_TRADING', 'results': results, 'id': id}, default=CryptoDockHelpers.json_serial)

    @staticmethod
    def LATENT_POLL(id, results) :
        return json.dumps({'command': 'LATENT_POLL', 'results': results, 'id': id}, default=CryptoDockHelpers.json_serial)

    @staticmethod
    def LOG_MESSAGE(id, message) :
        return json.dumps({'command': 'LOG_MESSAGE', 'message': message, 'id': id}, default=CryptoDockHelpers.json_serial)
