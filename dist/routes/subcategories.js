"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubcategories = getSubcategories;
exports.createSubcategory = createSubcategory;
const db_1 = require("../db");
function getSubcategories(req, res) {
    try {
        const stmt = db_1.db.prepare("SELECT * FROM subcategories");
        const rows = stmt.all();
        res.end(JSON.stringify(rows));
    }
    catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message }));
    }
}
function createSubcategory(req, res) {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
        const { category_id, name } = JSON.parse(body);
        try {
            const stmt = db_1.db.prepare("INSERT INTO subcategories (category_id, name) VALUES (?, ?)");
            const info = stmt.run(category_id, name); // synchronous insert
            res.end(JSON.stringify({ id: info.lastInsertRowid, category_id, name }));
        }
        catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
        }
    });
}
