PRAGMA foreign_keys = OFF;

BEGIN TRANSACTION;

CREATE TABLE categories (
    CategoryID INTEGER PRIMARY KEY AUTOINCREMENT,
    CategoryName TEXT,
    Description TEXT
);