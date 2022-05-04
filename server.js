import cors from "cors";
import express, { json } from "express";
import { createServer } from "http";
import { client } from "./db.js";
import { startSocket } from "./startSocket.js";

const app = express();
const db = client;
app.use(cors());
app.use(json());

// APP METHODS

// FRIEND-LIST
app.get("/friend-lists/:id", async (req, res) => {
  const query = `SELECT * FROM friend_lists WHERE id = ${req.params.id}`;
  const { rows } = await db.query(query);
  res.json(rows);
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const query = `SELECT id FROM users WHERE tag = '${req.body.userTag}'`
    const sql = await db.query(query);

    if (sql.rows.length) return res.json(sql.rows[0])
    res.status(404).send('User not found')
  } catch (err) {
    if (err?.constraint === "users_tag_unique") return res.json(err);
    res.status(500).json(err);
  }
});

// CRIAR USUÁRIO
app.post("/create-user", async (req, res) => {
  try {
    const query = `INSERT INTO users (tag) VALUES ('${req.body.userTag}') RETURNING id`;
    const sql = await db.query(query);
    res.json(sql.rows[0])
  } catch (err) {
    res.status(500).send("Internal Error")
  }
})

const server = createServer(app);
startSocket(server);
server.listen(8080, () => console.log("server rodando"));
