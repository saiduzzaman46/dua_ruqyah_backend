"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.join(__dirname, "..", "dua.db");
// Open the database (it will create the file if it doesn't exist)
exports.db = new better_sqlite3_1.default(dbPath);
// Initialize tables
function initializeDatabase() {
    try {
        // Categories
        exports.db.prepare(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
    `).run();
        // Subcategories
        exports.db.prepare(`
      CREATE TABLE IF NOT EXISTS subcategories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER,
        name TEXT NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )
    `).run();
        // Duas
        exports.db.prepare(`
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
    `).run();
        console.log("Tables created");
    }
    catch (err) {
        console.error("Database initialization failed:", err);
    }
}
// Call the function to create tables
initializeDatabase();
console.log("Connected to SQLite database using better-sqlite3");
