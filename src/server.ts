import http from "http";
import { getCategories, createCategory } from "./routes/categories";
import { getSubcategories, createSubcategory } from "./routes/subcategories";
import { getDuas, createDua } from "./routes/duas";

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  if (!req.url) return;

  // Categories
  if (req.url === "/api/categories" && req.method === "GET") {
    return getCategories(res);
  }

  if (req.url === "/api/categories" && req.method === "POST") {
    return createCategory(req, res);
  }

  // Subcategories
  if (req.url.startsWith("/api/subcategories") && req.method === "GET") {
    return getSubcategories(req, res);
  }

  if (req.url === "/api/subcategories" && req.method === "POST") {
    return createSubcategory(req, res);
  }

  // Duas
  if (req.url.startsWith("/api/duas") && req.method === "GET") {
    return getDuas(req, res);
  }

  if (req.url === "/api/duas" && req.method === "POST") {
    return createDua(req, res);
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ message: "Route not found" }));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
