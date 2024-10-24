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
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-24', 'Dividend', 300.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-24', 'Salary', 4800.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-24', 'Stock Gains', 1200.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-20', 'Consulting', 2500.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-20', 'Interest', 500.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-22', 'Bonus', 1800.00, 3);




