import { db } from "../db";
import { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";

export function getDuas(req: IncomingMessage, res: ServerResponse) {
  try {
    const url = new URL(req.url!, "http://localhost");
    const subcategoryId = url.searchParams.get("subcategoryId");

    let rows;
    if (subcategoryId) {
      const stmt = db.prepare("SELECT * FROM duas WHERE subcategory_id = ?");
      rows = stmt.all(subcategoryId);
    } else {
      const stmt = db.prepare("SELECT * FROM duas");
      rows = stmt.all();
    }

    res.end(JSON.stringify(rows));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: (err as Error).message }));
  }
}

export function createDua(req: IncomingMessage, res: ServerResponse) {
  let body = "";

  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    try {
      const {
        subcategory_id,
        title,
        about,
        arabic,
        arabic_translation,
        translation,
        reference,
      } = JSON.parse(body);

      const stmt = db.prepare(
        `INSERT INTO duas (subcategory_id, title, about, arabic, arabic_translation, translation, reference)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      );

      const info = stmt.run(
        subcategory_id,
        title,
        about,
        arabic,
        arabic_translation,
        translation,
        reference
      );

      res.end(
        JSON.stringify({
          id: info.lastInsertRowid,
          subcategory_id,
          title,
          about,
          arabic,
          arabic_translation,
          translation,
          reference,
        })
      );
    } catch (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: (err as Error).message }));
    }
  });
}
