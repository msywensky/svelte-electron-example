
DROP INDEX account_activity_id_idx;
DROP INDEX account_activity_account_idx;
DROP INDEX account_activity_date_idx;
DROP INDEX account_activity_symbol_idx;

DROP TABLE account_activity;

CREATE TABLE account_activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account NVARCHAR,
    activity_date DATETIME NOT NULL,
    symbol NVARCHAR NOT NULL,
    security_description NOT NULL,
    symbol_type NVARCHAR NOT NULL,
    underlying_symbol NVARCHAR,
    strike NUMERIC,
    expiration DATE,
    action NVARCHAR NOT NULL,
    quantity NUMERIC,
    price NUMERIC,
    commission NUMERIC,
    fees NUMERIC,
    amount NUMERIC,
    settlement_date DATETIME
);

CREATE UNIQUE INDEX IF NOT EXISTS account_activity_id_idx ON account_activity (
    id 
);

CREATE INDEX IF NOT EXISTS account_activity_account_idx ON account_activity (
    account
);

CREATE INDEX IF NOT EXISTS account_activity_date_idx ON account_activity (
    account, activity_date
);

CREATE INDEX IF NOT EXISTS account_activity_symbol_idx ON account_activity (
    account, symbol
);