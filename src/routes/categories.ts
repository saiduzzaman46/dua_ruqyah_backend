import { db } from "../db";
import { IncomingMessage, ServerResponse } from "http";

type CategoryRow = {
  category_id: number;
  category_name: string;
  subcategory_id: number | null;
  subcategory_name: string | null;
};

export function getCategories(res: ServerResponse) {
  db.all("SELECT * FROM categories ", [], (err, rows) => {
    if (err) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ error: err.message }));
    }
    res.end(JSON.stringify(rows));
  });
}

export function createCategory(req: IncomingMessage, res: ServerResponse) {
  let body = "";

  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const { name } = JSON.parse(body);

    db.run("INSERT INTO categories (name) VALUES (?)", [name], function (err) {
      if (err) {
        res.statusCode = 500;
        return res.end(JSON.stringify({ error: err.message }));
      }

      res.end(JSON.stringify({ id: this.lastID, name }));
    });
  });
}
