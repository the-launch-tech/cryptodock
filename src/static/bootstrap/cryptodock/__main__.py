from . import CryptoDockApi, CryptoDockStrategy, CryptoDockBacktest, CryptoDockArgs

def prove_instance() :
    print('\nPackage Instance Test (CryptoDockApi): ', CryptoDockApi(base="localhost", port=5000, version="v1"))
    print('\nPackage Instance Test (CryptoDockStrategy): ', CryptoDockStrategy())
    print('\nPackage Instance Test (CryptoDockBacktest): ', CryptoDockBacktest())
    print('\nPackage Instance Test (CryptoDockArgs): ', CryptoDockArgs())

if __name__ == '__main__':
    prove_instance()
