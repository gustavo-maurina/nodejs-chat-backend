import cors from "cors";
import express, { json } from "express";
import fs from "fs";
import { createServer } from "http";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { startDb } from "./db.js";
import { startSocket } from "./startSocket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const db = startDb();

const app = express();
app.use(cors());
app.use(json());

// generate route from files
const routePath = path.resolve(__dirname, "../src/routes/");
fs.readdirSync(routePath).forEach(async (file) => {
  let fileName = file.replace(".js", "");
  fileName = fileName.split(".")[0];
  const route = await import(`../src/routes/${fileName}.routes.js`);
  app.use(route.default);
});

const server = createServer(app);
startSocket(server);
server.listen(8080, () => console.log("server rodando"));
