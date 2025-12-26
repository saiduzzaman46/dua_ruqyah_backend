import sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.join(__dirname, "..", "dua.db");

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Connection failed", err);
  } else {
    console.log("Connected");
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Categories
    db.run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
    `);

    // Subcategories
    db.run(`
      CREATE TABLE IF NOT EXISTS subcategories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER,
        name TEXT NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )
    `);

    // Duas
    db.run(`
      CREATE TABLE IF NOT EXISTS duas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subcategory_id INTEGER,
        title TEXT,
        about TEXT,
        arabic TEXT,
        arabic_translation TEXT,
        translation TEXT,
        reference TEXT,
        FOREIGN KEY (subcategory_id) REFERENCES subcategories(id)
      )
    `);

    console.log("Tables created");
  });
}
