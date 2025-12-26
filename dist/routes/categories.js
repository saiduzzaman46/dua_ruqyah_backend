"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = getCategories;
exports.createCategory = createCategory;
const db_1 = require("../db");
// export function getCategories(res: ServerResponse) {
//   const sql = `SELECT
//       c.id as category_id,
//       c.name as category_name,
//       s.id as subcategory_id,
//       s.name as subcategory_name
//     FROM categories c
//     LEFT JOIN subcategories s ON c.id = s.category_id
//     ORDER BY c.id, s.id`;
//   db.all<CategoryRow>(sql, [], (err, rows) => {
//     if (err) {
//       res.statusCode = 500;
//       return res.end(JSON.stringify({ error: err.message }));
//     }
//     const categoriesMap: Record<number, any> = {};
//     rows.forEach((row) => {
//       if (!categoriesMap[row.category_id]) {
//         categoriesMap[row.category_id] = {
//           id: row.category_id,
//           name: row.category_name,
//           subcategories: [],
//         };
//       }
//       if (row.subcategory_id) {
//         categoriesMap[row.category_id].subcategories.push({
//           id: row.subcategory_id,
//           name: row.subcategory_name,
//         });
//       }
//     });
//     const categories = Object.values(categoriesMap);
//     res.end(JSON.stringify(categories));
//   });
// }
function getCategories(res) {
    db_1.db.all("SELECT * FROM categories ", [], (err, rows) => {
        if (err) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: err.message }));
        }
        res.end(JSON.stringify(rows));
    });
}
function createCategory(req, res) {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
        const { name } = JSON.parse(body);
        db_1.db.run("INSERT INTO categories (name) VALUES (?)", [name], function (err) {
            if (err) {
                res.statusCode = 500;
                return res.end(JSON.stringify({ error: err.message }));
            }
            res.end(JSON.stringify({ id: this.lastID, name }));
        });
    });
}
