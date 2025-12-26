import { db } from "../db";
import { IncomingMessage, ServerResponse } from "http";

// Get all categories
export function getCategories(res: ServerResponse) {
  try {
    const stmt = db.prepare("SELECT * FROM categories");
    const rows = stmt.all();
    res.end(JSON.stringify(rows));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: (err as Error).message }));
  }
}

// Create a new category
export function createCategory(req: IncomingMessage, res: ServerResponse) {
  let body = "";

  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    try {
      const { name } = JSON.parse(body);

      const stmt = db.prepare("INSERT INTO categories (name) VALUES (?)");
      const info = stmt.run(name);

      res.end(JSON.stringify({ id: info.lastInsertRowid, name }));
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: (err as Error).message }));
    }
  });
}
