"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubcategories = getSubcategories;
exports.createSubcategory = createSubcategory;
const db_1 = require("../db");
function getSubcategories(req, res) {
    db_1.db.all("SELECT * FROM subcategories ", [], (err, rows) => {
        if (err) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: err.message }));
        }
        res.end(JSON.stringify(rows));
    });
}
function createSubcategory(req, res) {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
        const { category_id, name } = JSON.parse(body);
        db_1.db.run("INSERT INTO subcategories (category_id, name) VALUES (?, ?)", [category_id, name], function (err) {
            if (err) {
                res.statusCode = 500;
                return res.end(JSON.stringify({ error: err.message }));
            }
            res.end(JSON.stringify({ id: this.lastID, category_id, name }));
        });
    });
}
