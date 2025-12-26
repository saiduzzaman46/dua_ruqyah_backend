import { db } from "../db";
import { IncomingMessage, ServerResponse } from "http";

export function getSubcategories(req: IncomingMessage, res: ServerResponse) {
  try {
    const stmt = db.prepare("SELECT * FROM subcategories");
    const rows = stmt.all();
    res.end(JSON.stringify(rows));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: (err as Error).message }));
  }
}

export function createSubcategory(req: IncomingMessage, res: ServerResponse) {
  let body = "";

  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const { category_id, name } = JSON.parse(body);

    try {
      const stmt = db.prepare(
        "INSERT INTO subcategories (category_id, name) VALUES (?, ?)"
      );
      const info = stmt.run(category_id, name); // synchronous insert
      res.end(JSON.stringify({ id: info.lastInsertRowid, category_id, name }));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: (err as Error).message }));
    }
  });
}
