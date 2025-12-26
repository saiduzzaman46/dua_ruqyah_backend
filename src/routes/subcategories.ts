import { db } from "../db";
import { IncomingMessage, ServerResponse } from "http";

export function getSubcategories(req: IncomingMessage, res: ServerResponse) {
  db.all("SELECT * FROM subcategories ", [], (err, rows) => {
    if (err) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ error: err.message }));
    }
    res.end(JSON.stringify(rows));
  });
}

export function createSubcategory(req: IncomingMessage, res: ServerResponse) {
  let body = "";

  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const { category_id, name } = JSON.parse(body);

    db.run(
      "INSERT INTO subcategories (category_id, name) VALUES (?, ?)",
      [category_id, name],
      function (err) {
        if (err) {
          res.statusCode = 500;
          return res.end(JSON.stringify({ error: err.message }));
        }

        res.end(JSON.stringify({ id: this.lastID, category_id, name }));
      }
    );
  });
}
