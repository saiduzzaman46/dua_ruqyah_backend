import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(__dirname, "..", "dua.db");

// Open the database (it will create the file if it doesn't exist)
export const db = new Database(dbPath);

// Initialize tables
function initializeDatabase() {
  try {
    // Categories
    db.prepare(
      `
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
    `
    ).run();

    // Subcategories
    db.prepare(
      `
      CREATE TABLE IF NOT EXISTS subcategories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER,
        name TEXT NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )
    `
    ).run();

    // Duas
    db.prepare(
      `
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
    `
    ).run();

    console.log("Tables created");
  } catch (err) {
    console.error("Database initialization failed:", err);
  }
}

// Call the function to create tables
initializeDatabase();

console.log("Connected to SQLite database using better-sqlite3");
