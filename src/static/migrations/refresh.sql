CREATE TABLE IF NOT EXISTS strategies
  (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL UNIQUE,
    label VARCHAR(40),
    description VARCHAR(5000),
    full_path VARCHAR(255) NOT NULL,
    status VARCHAR(12) NOT NULL DEFAULT "latent",
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE IF NOT EXISTS orders
  (
    id INT NOT NULL AUTO_INCREMENT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE
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

CREATE TABLE IF NOT EXISTS backtesters
  (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    label VARCHAR(100) NOT NULL,
    description VARCHAR(5000),
    remote_host VARCHAR(255) NOT NULL,
    remote_path VARCHAR(255) NOT NULL,
    remote_entry VARCHAR(255) NOT NULL,
    custom BOOLEAN DEFAULT false,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE IF NOT EXISTS backtests
  (
    id INT NOT NULL AUTO_INCREMENT,
    start_time VARCHAR(20) NOT NULL,
    end_time VARCHAR(20) NOT NULL,
    starting_funds VARCHAR(20) NOT NULL,
    ending_funds VARCHAR(100) NOT NULL,
    completed BOOLEAN,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    backtester_id INT NOT NULL,
    strategy_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (backtester_id) REFERENCES backtesters (id) ON DELETE CASCADE,
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS test_orders
  (
    id INT NOT NULL AUTO_INCREMENT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    backtester_id INT NOT NULL,
    backtest_id INT NOT NULL,
    strategy_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (backtester_id) REFERENCES backtesters (id) ON DELETE CASCADE,
    FOREIGN KEY (backtest_id) REFERENCES backtests (id) ON DELETE CASCADE,
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE
  );
