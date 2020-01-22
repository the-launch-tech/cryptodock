CREATE TABLE IF NOT EXISTS strategies
  (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL UNIQUE,
    label VARCHAR(40),
    description VARCHAR(5000),
    full_path VARCHAR(255) NOT NULL,
    status VARCHAR(12) NOT NULL DEFAULT "latent",
    backtest_status VARCHAR(12) NOT NULL DEFAULT "latent",
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE IF NOT EXISTS live_sessions
  (
    id INT NOT NULL AUTO_INCREMENT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    granularity INT(10),
    start_funds DECIMAL(20, 10),
    end_funds DECIMAL(20, 10),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS test_sessions
  (
    id INT NOT NULL AUTO_INCREMENT,
    label VARCHAR(100),
    custom BOOLEAN NOT NULL DEFAULT FALSE,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    granularity INT(10),
    start_funds DECIMAL(20, 10),
    end_funds DECIMAL(20, 10),
    description VARCHAR(5000),
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS live_orders
  (
    id INT NOT NULL AUTO_INCREMENT,
    pair VARCHAR(30),
    exchange VARCHAR(40),
    quantity DECIMAL(24, 12),
    direction VARCHAR(30),
    order_type VARCHAR(30),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    live_session_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE,
    FOREIGN KEY (live_session_id) REFERENCES live_sessions (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS test_orders
  (
    id INT NOT NULL AUTO_INCREMENT,
    pair VARCHAR(30),
    exchange VARCHAR(40),
    quantity DECIMAL(24, 12),
    direction VARCHAR(30),
    order_type VARCHAR(30),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    test_session_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE,
    FOREIGN KEY (test_session_id) REFERENCES test_sessions (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS live_events
  (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(5000),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    live_session_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE,
    FOREIGN KEY (live_session_id) REFERENCES live_sessions (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS test_events
  (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(5000),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    test_session_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE,
    FOREIGN KEY (test_session_id) REFERENCES test_sessions (id) ON DELETE CASCADE
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
