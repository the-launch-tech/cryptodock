CREATE TABLE exchanges
  (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    label VARCHAR(50) NOT NULL UNIQUE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE products
  (
    id INT NOT NULL AUTO_INCREMENT,
    pair VARCHAR(10) NOT NULL UNIQUE,
    base VARCHAR(5) NOT NULL UNIQUE,
    quote VARCHAR(5) NOT NULL UNIQUE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE product_exchange
  (
    id INT NOT NULL AUTO_INCREMENT,
    trade_status BOOLEAN NOT NULL DEFAULT true,
    has_margin BOOLEAN NOT NULL DEFAULT true,
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

CREATE TABLE strategies
  (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    label VARCHAR(40) NOT NULL UNIQUE,
    status VARCHAR(12) NOT NULL DEFAULT "latent",
    updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    product_exchange_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (product_exchange_id) REFERENCES product_exchange (id) ON DELETE CASCADE,
  );

CREATE TABLE strategymetas
  (
    id INT NOT NULL AUTO_INCREMENT,
    key_ VARCHAR(20),
    _value VARCHAR(100),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE
  );

CREATE TABLE klines
  (
    id INT NOT NULL AUTO_INCREMENT,
    time INT(11),
    low DECIMAL(18, 10),
    high DECIMAL(18, 10),
    open DECIMAL(18, 10),
    close DECIMAL(18, 10),
    volume DECIMAL(18, 10),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exchange_id INT NOT NULL,
    product_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (exchange_id) REFERENCES exchanges (id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
  );

CREATE TABLE transactions
  (
    id INT NOT NULL AUTO_INCREMENT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id)
  );

CREATE TABLE logs
  (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(5000),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE settings
  (
    id INT NOT NULL AUTO_INCREMENT,
    key_ VARCHAR(50) NOT NULL UNIQUE,
    _value VARCHAR(5000) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );
