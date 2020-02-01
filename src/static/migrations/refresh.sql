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

CREATE TABLE IF NOT EXISTS sessions
  (
    id INT NOT NULL AUTO_INCREMENT,
    label VARCHAR(100),
    description VARCHAR(5000),
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    granularity INT(10),
    backtest BOOLEAN NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS events
  (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(50) NOT NULL,
    cycles INT NOT NULL,
    current_duration DECIMAL(24, 12) NOT NULL,
    start_funds DECIMAL(24, 12) NOT NULL,
    current_funds DECIMAL(24, 12) NOT NULL,
    change_percentage DECIMAL(24, 12) NOT NULL,
    change_usd DECIMAL(24, 12) NOT NULL,
    avg_time_between_orders DECIMAL(24, 12) NOT NULL,
    avg_order_size DECIMAL(24, 12) NOT NULL,
    avg_fill_size DECIMAL(24, 12) NOT NULL,
    signal_count INT NOT NULL,
    order_count INT NOT NULL,
    cancel_count INT NOT NULL,
    fill_count INT NOT NULL,
    buy_percentage DECIMAL(10, 5) NOT NULL,
    sell_percentage DECIMAL(10, 5) NOT NULL,
    market_type_percentage DECIMAL(10, 5) NOT NULL,
    limit_type_percentage DECIMAL(10, 5) NOT NULL,
    avg_fee DECIMAL(24, 12) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    session_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES sessions (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS signals
  (
    id INT NOT NULL AUTO_INCREMENT,
    pair VARCHAR(30),
    exchange VARCHAR(40),
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    direction VARCHAR(30),
    weight DECIMAL(24, 12),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    session_id INT NOT NULL,
    event_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES sessions (id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS orders
  (
    id INT NOT NULL AUTO_INCREMENT,
    pair VARCHAR(20) NOT NULL,
    base VARCHAR(10) NOT NULL,
    quote VARCHAR(10) NOT NULL,
    exchange VARCHAR(40) NOT NULL,
    quote_exchange VARCHAR(40),
    base_size DECIMAL(24, 12) NOT NULL,
    side VARCHAR(30),
    type VARCHAR(30),
    stp VARCHAR(20),
    stop VARCHAR(20),
    stop_price DECIMAL(24, 12),
    quote_size DECIMAL(24, 12),
    post_only__limit BOOLEAN,
    time_in_force__limit VARCHAR(30),
    cancel_after__limit VARCHAR(30),
    is_pending BOOLEAN NOT NULL DEFAULT true,
    is_cancelled BOOLEAN NOT NULL DEFAULT false,
    is_filled BOOLEAN NOT NULL DEFAULT false,
    client_oid VARCHAR(100),
    exchange_oid VARCHAR(100) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    session_id INT NOT NULL,
    event_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES sessions (id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS fills
  (
    id INT NOT NULL AUTO_INCREMENT,
    pair VARCHAR(30) NOT NULL,
    exchange VARCHAR(40) NOT NULL,
    price DECIMAL(24, 12) NOT NULL,
    size DECIMAL(24, 12) NOT NULL,
    liquidity VARCHAR(10) NOT NULL,
    fee DECIMAL(24, 12) NOT NULL,
    settled BOOLEAN NOT NULL DEFAULT true,
    side VARCHAR(30) NOT NULL,
    filled_at VARCHAR(30) NOT NULL,
    exchange_oid VARCHAR(100) NOT NULL,
    exchange_tid VARCHAR(100) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    strategy_id INT NOT NULL,
    session_id INT NOT NULL,
    event_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (strategy_id) REFERENCES strategies (id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES sessions (id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE
  );

CREATE TABLE IF NOT EXISTS settings
  (
    id INT NOT NULL AUTO_INCREMENT,
    key_ VARCHAR(50) NOT NULL UNIQUE,
    _value VARCHAR(5000) NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );

CREATE TABLE IF NOT EXISTS logs
  (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(5000),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  );
