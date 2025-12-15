-- ENUM TYPES
CREATE TYPE invoice_type_enum AS ENUM (
  'RENT','DEPOSIT','ELECTRIC','WATER','SERVICE','EXTRA','REPAIR'
);

CREATE TYPE invoice_status_enum AS ENUM (
  'PENDING','PAID','OVERDUE'
);

CREATE TYPE payment_status_enum AS ENUM (
  'SUCCESS','FAILED','PENDING'
);

CREATE TYPE payment_method_enum AS ENUM (
  'ZALOPAY','MOMO','BANK','CASH'
);

CREATE TYPE utility_type_enum AS ENUM (
  'ELECTRIC','WATER'
);

-- INVOICES
CREATE TABLE invoices (
                          id BIGSERIAL PRIMARY KEY,
                          user_id BIGINT NOT NULL,
                          contract_id BIGINT,
                          room_id BIGINT NOT NULL,
                          invoice_type invoice_type_enum NOT NULL,
                          amount DECIMAL(12,2) NOT NULL,
                          due_date DATE NOT NULL,
                          status invoice_status_enum DEFAULT 'PENDING',
                          details VARCHAR(255),
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          month INT NOT NULL
);

-- PAYMENT TRANSACTIONS
CREATE TABLE payment_transactions (
                                      id BIGSERIAL PRIMARY KEY,
                                      invoice_id BIGINT NOT NULL,
                                      amount DECIMAL(12,2) NOT NULL,
                                      gateway VARCHAR(20),
                                      status payment_status_enum DEFAULT 'PENDING',
                                      method payment_method_enum,
                                      paid_at TIMESTAMP,
                                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- UTILITY READINGS
CREATE TABLE utility_readings (
                                  id BIGSERIAL PRIMARY KEY,
                                  room_id BIGINT NOT NULL,
                                  type utility_type_enum NOT NULL,
                                  old_value INT NOT NULL,
                                  new_value INT NOT NULL,
                                  unit_price DECIMAL(10,2) NOT NULL,
                                  month INT NOT NULL,
                                  year INT NOT NULL,
                                  generated_invoice_id BIGINT,
                                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PAYMENT METHODS
CREATE TABLE payment_methods (
                                 id BIGSERIAL PRIMARY KEY,
                                 user_id BIGINT NOT NULL,
                                 type payment_method_enum,
                                 info JSONB,
                                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
