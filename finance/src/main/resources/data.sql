CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    name VARCHAR(255)
);

INSERT INTO "USERS" (email, password, name) VALUES ('alice.smith@example.com', 'password123', 'Alice Smith');
INSERT INTO "USERS" (email, password, name) VALUES ('bob.johnson@example.com', 'password121', 'Bob Johnson');
INSERT INTO "USERS" (email, password, name) VALUES ('charlie.brown@example.com', 'password183', 'Charlie Brown');
INSERT INTO "USERS" (email, password, name) VALUES ('david.wilson@example.com', 'password923', 'David Wilson');
INSERT INTO "USERS" (email, password, name) VALUES ('emma.jones@example.com', 'password103', 'Emma Jones');
INSERT INTO "USERS" (email, password, name) VALUES ('fiona.miller@example.com', 'password423', 'Fiona Miller');
INSERT INTO "USERS" (email, password, name) VALUES ('george.davis@example.com', 'password133', 'George Davis');
INSERT INTO "USERS" (email, password, name) VALUES ('hannah.garcia@example.com', 'password223', 'Hannah Garcia');
INSERT INTO "USERS" (email, password, name) VALUES ('ian.thompson@example.com', 'password120', 'Ian Thompson');
INSERT INTO "USERS" (email, password, name) VALUES ('julia.martinez@example.com', 'password723', 'Julia Martinez');
