CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50),
    password CHAR(8),
    name VARCHAR(50)
);

INSERT INTO "USERS" (email, password, name) VALUES ('alice.smith@example.com', 'pass123', 'Alice Smith');
INSERT INTO "USERS" (email, password, name) VALUES ('bob.johnson@example.com', 'pass121', 'Bob Johnson');
INSERT INTO "USERS" (email, password, name) VALUES ('charlie.brown@example.com', 'pass183', 'Charlie Brown');
INSERT INTO "USERS" (email, password, name) VALUES ('david.wilson@example.com', 'pass923', 'David Wilson');
INSERT INTO "USERS" (email, password, name) VALUES ('emma.jones@example.com', 'pass103', 'Emma Jones');
INSERT INTO "USERS" (email, password, name) VALUES ('fiona.miller@example.com', 'pass423', 'Fiona Miller');
INSERT INTO "USERS" (email, password, name) VALUES ('george.davis@example.com', 'pass133', 'George Davis');
INSERT INTO "USERS" (email, password, name) VALUES ('hannah.garcia@example.com', 'pass223', 'Hannah Garcia');
INSERT INTO "USERS" (email, password, name) VALUES ('ian.thompson@example.com', 'pass120', 'Ian Thompson');
INSERT INTO "USERS" (email, password, name) VALUES ('julia.martinez@example.com', 'pass723', 'Julia Martinez');


CREATE TABLE IF NOT EXISTS income (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    category VARCHAR(50) NOT NULL,
    amount DOUBLE NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE
);

INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-01', 'Salary', 5000.00, 1);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-09-15', 'Freelance', 1500.00, 2);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-05', 'Bonus', 2000.00, 1);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-09-10', 'Rental Income', 800.00, 2);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-09-20', 'Dividend', 300.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-01', 'Salary', 4800.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-03', 'Stock Gains', 1200.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-10-08', 'Consulting', 2500.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-09-29', 'Interest', 500.00, 3);
INSERT INTO INCOME (date, category, amount, user_id) VALUES ('2024-09-25', 'Bonus', 1800.00, 3);




