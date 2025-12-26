"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const categories_1 = require("./routes/categories");
const subcategories_1 = require("./routes/subcategories");
const duas_1 = require("./routes/duas");
const server = http_1.default.createServer(async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        res.end();
        return;
    }
    if (!req.url)
        return;
    // Categories
    if (req.url === "/api/categories" && req.method === "GET") {
        return (0, categories_1.getCategories)(res);
    }
    if (req.url === "/api/categories" && req.method === "POST") {
        return (0, categories_1.createCategory)(req, res);
    }
    // Subcategories
    if (req.url.startsWith("/api/subcategories") && req.method === "GET") {
        return (0, subcategories_1.getSubcategories)(req, res);
    }
    if (req.url === "/api/subcategories" && req.method === "POST") {
        return (0, subcategories_1.createSubcategory)(req, res);
    }
    // Duas
    if (req.url.startsWith("/api/duas") && req.method === "GET") {
        return (0, duas_1.getDuas)(req, res);
    }
    if (req.url === "/api/duas" && req.method === "POST") {
        return (0, duas_1.createDua)(req, res);
    }
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route not found" }));
});
server.listen(4000, () => {
    console.log("Server running at http://localhost:4000");
});
