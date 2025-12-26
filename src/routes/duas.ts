import { db } from "../db";
import { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";

export function getDuas(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url!, "http://localhost");
  const subcategoryId = url.searchParams.get("subcategoryId");

  db.all("SELECT * FROM duas", [], (err, rows) => {
    if (err) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ error: err.message }));
    }
    res.end(JSON.stringify(rows));
  });
}

export function createDua(req: IncomingMessage, res: ServerResponse) {
  let body = "";

  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const {
      subcategory_id,
      title,
      about,
      arabic,
      arabic_translation,
      translation,
      reference,
    } = JSON.parse(body);

    db.run(
      `INSERT INTO duas (subcategory_id, title,about, arabic,arabic_translation, translation,reference)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        subcategory_id,
        title,
        about,
        arabic,
        arabic_translation,
        translation,
        reference,
      ],
      function (err) {
        if (err) {
          res.statusCode = 500;
          return res.end(JSON.stringify({ error: err.message }));
        }

        res.end(
          JSON.stringify({
            id: this.lastID,
            subcategory_id,
            title,
            about,
            arabic,
            arabic_translation,
            translation,
            reference,
          })
        );
      }
    );
  });
}
