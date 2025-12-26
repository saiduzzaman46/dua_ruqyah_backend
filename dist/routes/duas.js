"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDuas = getDuas;
exports.createDua = createDua;
const db_1 = require("../db");
const url_1 = require("url");
function getDuas(req, res) {
    try {
        const url = new url_1.URL(req.url, "http://localhost");
        const subcategoryId = url.searchParams.get("subcategoryId");
        let rows;
        if (subcategoryId) {
            const stmt = db_1.db.prepare("SELECT * FROM duas WHERE subcategory_id = ?");
            rows = stmt.all(subcategoryId);
        }
        else {
            const stmt = db_1.db.prepare("SELECT * FROM duas");
            rows = stmt.all();
        }
        res.end(JSON.stringify(rows));
    }
    catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message }));
    }
}
function createDua(req, res) {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
        try {
            const { subcategory_id, title, about, arabic, arabic_translation, translation, reference, } = JSON.parse(body);
            const stmt = db_1.db.prepare(`INSERT INTO duas (subcategory_id, title, about, arabic, arabic_translation, translation, reference)
         VALUES (?, ?, ?, ?, ?, ?, ?)`);
            const info = stmt.run(subcategory_id, title, about, arabic, arabic_translation, translation, reference);
            res.end(JSON.stringify({
                id: info.lastInsertRowid,
                subcategory_id,
                title,
                about,
                arabic,
                arabic_translation,
                translation,
                reference,
            }));
        }
        catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
        }
    });
}
