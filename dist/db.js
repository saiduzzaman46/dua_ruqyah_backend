"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.join(__dirname, "..", "dua.db");
exports.db = new sqlite3_1.default.Database(dbPath, (err) => {
    if (err) {
        console.error("Connection failed", err);
    }
    else {
        console.log("Connected");
        initializeDatabase();
    }
});
function initializeDatabase() {
    exports.db.serialize(() => {
        // Categories
        exports.db.run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
    `);
        // Subcategories
        exports.db.run(`
      CREATE TABLE IF NOT EXISTS subcategories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER,
        name TEXT NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )
    `);
        // Duas
        exports.db.run(`
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
