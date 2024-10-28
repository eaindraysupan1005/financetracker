CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50),
    password CHAR(8),
    name VARCHAR(50)
);

INSERT INTO "USERS" (email, password, name) VALUES ('alice.smith@example.com', 'pass1234', 'Alice Smith');
INSERT INTO "USERS" (email, password, name) VALUES ('bob.johnson@example.com', 'pass1214', 'Bob Johnson');
INSERT INTO "USERS" (email, password, name) VALUES ('charlie.brown@example.com', 'pass1834', 'Charlie Brown');
INSERT INTO "USERS" (email, password, name) VALUES ('david.wilson@example.com', 'pass9243', 'David Wilson');
INSERT INTO "USERS" (email, password, name) VALUES ('emma.jones@example.com', 'pass1034', 'Emma Jones');
INSERT INTO "USERS" (email, password, name) VALUES ('fiona.miller@example.com', 'pass4243', 'Fiona Miller');
INSERT INTO "USERS" (email, password, name) VALUES ('george.davis@example.com', 'pass1433', 'George Davis');
INSERT INTO "USERS" (email, password, name) VALUES ('hannah.garcia@example.com', 'pass4223', 'Hannah Garcia');
INSERT INTO "USERS" (email, password, name) VALUES ('ian.thompson@example.com', 'pass1240', 'Ian Thompson');
INSERT INTO "USERS" (email, password, name) VALUES ('julia.martinez@example.com', 'pass7243', 'Julia Martinez');


CREATE TABLE IF NOT EXISTS income (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    category VARCHAR(50) NOT NULL,
    amount DOUBLE NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE
);

INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-24', 'Salary', 5000.00, 1);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-24', 'Freelance', 1500.00, 2);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-24', 'Bonus', 2000.00, 1);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-24', 'Rental Income', 800.00, 2);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-28', 'Salary', 1000.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-27', 'Pocket Money', 4800.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-24', 'Bonus', 1200.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-20', 'Lottery', 2500.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-28', 'Interest', 500.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-21', 'Bonus', 1800.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-19', 'Salary', 3000.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-22', 'Pocket Money', 4800.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-18', 'Salary', 1900.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-25', 'Salary', 500.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-15', 'Lottery', 800.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-18', 'Bonus', 400.00, 3);

CREATE TABLE IF NOT EXISTS budget (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    category VARCHAR(50) NOT NULL,
    limit DOUBLE NOT NULL,
    spent DOUBLE NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE
);

INSERT INTO BUDGET (date, category, limit, spent, user_id) VALUES ('2024-10-24', 'Food', 1500.00, 800.00, 1);
INSERT INTO BUDGET (date, category, limit, spent, user_id) VALUES ('2024-10-24', 'Shopping', 1500.00, 500.00, 2);
INSERT INTO BUDGET (date, category, limit, spent, user_id) VALUES ('2024-10-24', 'Beauty', 1000.00, 1000.00, 1);
INSERT INTO BUDGET (date, category, limit, spent, user_id) VALUES ('2024-10-24', 'Transportation', 800.00, 300.00, 2);
INSERT INTO BUDGET (date, category, limit, spent, user_id) VALUES ('2024-10-27', 'Entertainment', 300.00, 0.00, 3);
INSERT INTO BUDGET (date, category, limit, spent, user_id) VALUES ('2024-10-27', 'Sports', 500.00, 100.00, 3);
INSERT INTO BUDGET (date, category, limit, spent, user_id) VALUES ('2024-10-24', 'Education', 1800.00, 1000.00, 3);
INSERT INTO BUDGET (date, category, limit, spent, user_id) VALUES ('2024-10-20', 'Clothing', 2500.00, 400.00 3);
INSERT INTO BUDGET (date, category, limit, spent, user_id) VALUES ('2024-10-20', 'Bills', 500.00, 300.00, 3);
INSERT INTO BUDGET (date, category, limit, spent, user_id) VALUES ('2024-10-22', 'Social', 1800.00, 1000.00, 3);

-- Create the expense table
CREATE TABLE IF NOT EXISTS expense (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    category VARCHAR(50) NOT NULL,
    amount DOUBLE NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_user_expense FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE
);

-- Insert sample data into the expense table
INSERT INTO EXPENSE (date, category, amount, user_id) VALUES ('2024-10-24', 'Entertainment', 1200.00, 1);
INSERT INTO EXPENSE (date, category, amount, user_id) VALUES ('2024-10-24', 'Shopping', 300.00, 2);
INSERT INTO EXPENSE (date, category, amount, user_id) VALUES ('2024-10-24', 'Shopping', 150.00, 1);
INSERT INTO EXPENSE (date, category, amount, user_id) VALUES ('2024-10-28', 'Transportation', 80.00, 3);
INSERT INTO EXPENSE (date, category, amount, user_id) VALUES ('2024-10-27', 'Food', 60.00, 3);
INSERT INTO EXPENSE (date, category, amount, user_id) VALUES ('2024-10-27', 'Food', 200.00, 3);
INSERT INTO EXPENSE (date, category, amount, user_id) VALUES ('2024-10-28', 'Entertainment', 450.00, 3);
INSERT INTO EXPENSE (date, category, amount, user_id) VALUES ('2024-10-28', 'Transportation', 50.00, 3);
INSERT INTO EXPENSE (date, category, amount, user_id) VALUES ('2024-10-28', 'Shopping', 100.00, 3);
INSERT INTO EXPENSE (date, category, amount, user_id) VALUES ('2024-10-19', 'Entertainment', 200.00, 3);
INSERT INTO EXPENSE (date, category, amount, user_id) VALUES ('2024-10-22', 'Food', 150.00, 3);
INSERT INTO EXPENSE (date, category, amount, user_id) VALUES ('2024-10-18', 'Transportation', 300.00, 3);
INSERT INTO EXPENSE (date, category, amount, user_id) VALUES ('2024-10-25', 'Food', 50.00, 3);
INSERT INTO EXPENSE (date, category, amount, user_id) VALUES ('2024-10-20', 'Transportation', 200.00, 3);
INSERT INTO EXPENSE (date, category, amount, user_id) VALUES ('2024-10-18', 'Food', 400.00, 3);


