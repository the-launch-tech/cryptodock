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

CREATE TABLE IF NOT EXISTS orders
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
