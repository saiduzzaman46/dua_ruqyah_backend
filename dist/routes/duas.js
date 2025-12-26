"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDuas = getDuas;
exports.createDua = createDua;
const db_1 = require("../db");
const url_1 = require("url");
function getDuas(req, res) {
    const url = new url_1.URL(req.url, "http://localhost");
    const subcategoryId = url.searchParams.get("subcategoryId");
    db_1.db.all("SELECT * FROM duas", [], (err, rows) => {
        if (err) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: err.message }));
        }
        res.end(JSON.stringify(rows));
    });
}
function createDua(req, res) {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
        const { subcategory_id, title, about, arabic, arabic_translation, translation, reference, } = JSON.parse(body);
        db_1.db.run(`INSERT INTO duas (subcategory_id, title,about, arabic,arabic_translation, translation,reference)
       VALUES (?, ?, ?, ?, ?, ?, ?)`, [
            subcategory_id,
            title,
            about,
            arabic,
            arabic_translation,
            translation,
            reference,
        ], function (err) {
            if (err) {
                res.statusCode = 500;
                return res.end(JSON.stringify({ error: err.message }));
            }
            res.end(JSON.stringify({
                id: this.lastID,
                subcategory_id,
                title,
                about,
                arabic,
                arabic_translation,
                translation,
                reference,
            }));
        });
    });
}
