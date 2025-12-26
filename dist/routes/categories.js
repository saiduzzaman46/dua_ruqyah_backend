"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = getCategories;
exports.createCategory = createCategory;
const db_1 = require("../db");
// Get all categories
function getCategories(res) {
    try {
        const stmt = db_1.db.prepare("SELECT * FROM categories");
        const rows = stmt.all();
        res.end(JSON.stringify(rows));
    }
    catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message }));
    }
}
// Create a new category
function createCategory(req, res) {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
        try {
            const { name } = JSON.parse(body);
            const stmt = db_1.db.prepare("INSERT INTO categories (name) VALUES (?)");
            const info = stmt.run(name);
            res.end(JSON.stringify({ id: info.lastInsertRowid, name }));
        }
        catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
        }
    });
}
