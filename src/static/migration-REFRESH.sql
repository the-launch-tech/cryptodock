CREATE TABLE IF NOT EXISTS exchanges
  (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    label VARCHAR(50) NOT NULL UNIQUE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE IF NOT EXISTS products
  (
    id INT NOT NULL AUTO_INCREMENT,
    pair VARCHAR(10) NOT NULL UNIQUE,
    base VARCHAR(5) NOT NULL UNIQUE,
    quote VARCHAR(5) NOT NULL UNIQUE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE IF NOT EXISTS product_exchange
  (
    id INT NOT NULL AUTO_INCREMENT,
    trading BOOLEAN NOT NULL DEFAULT true,
    margin BOOLEAN DEFAULT false,
    iceberg BOOLEAN,
    oco BOOLEAN,
    spot_trading BOOLEAN,
    base_min DECIMAL(9, 8) NOT NULL,
    base_max DECIMAL(16, 8),
    quote_min DECIMAL(9, 8) NOT NULL,
    quote_max DECIMAL(16, 8),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exchange_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (exchange_id) REFERENCES exchanges (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS strategies
  (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL UNIQUE,
    label VARCHAR(40),
    status VARCHAR(12) DEFAULT "latent",
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exchange_id INT,
    product_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (exchange_id) REFERENCES exchanges (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS strategymetas
  (
    id INT NOT NULL AUTO_INCREMENT,
    key_ VARCHAR(20),
    _value VARCHAR(100),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS klines
  (
    id INT NOT NULL AUTO_INCREMENT,
    server_time INT(11),
    low DECIMAL(18, 10),
    high DECIMAL(18, 10),
    open DECIMAL(18, 10),
    close DECIMAL(18, 10),
    amount DECIMAL(18, 10),
    volume DECIMAL(18, 10),
    quote_volume DECIMAL(18, 10),
    taker_buy_base_asset_volume DECIMAL(18, 10),
    taker_buy_quote_asset_volume DECIMAL(18, 10),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exchange_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (exchange_id) REFERENCES exchanges (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS trades
  (
    id INT NOT NULL AUTO_INCREMENT,
    sequenceID INT(11),
    server_time INT(11),
    price DECIMAL(18, 10),
    size DECIMAL(18, 10),
    quote_size DECIMAL(18, 10),
    side VARCHAR(10),
    best_match BOOLEAN,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exchange_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (exchange_id) REFERENCES exchanges (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS orderbooks
  (
    id INT NOT NULL AUTO_INCREMENT,
    sequenceID INT(11),
    server_time INT(11),
    bid_price DECIMAL(18, 10),
    bid_size DECIMAL(18, 10),
    ask_price DECIMAL(18, 10),
    ask_size DECIMAL(18, 10),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exchange_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (exchange_id) REFERENCES exchanges (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS transactions
  (
    id INT NOT NULL AUTO_INCREMENT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id)
  );

CREATE TABLE IF NOT EXISTS logs
  (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(5000),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE IF NOT EXISTS settings
  (
    id INT NOT NULL AUTO_INCREMENT,
    key_ VARCHAR(50) NOT NULL UNIQUE,
    _value VARCHAR(5000) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );
