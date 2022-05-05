import { Router } from "express";
import { db } from "../../config/db.js";

const router = Router();

router.route("/login").post(async (req, res) => {
  try {
    const query = `SELECT id FROM users WHERE tag = '${req.body.userTag}'`;
    const sql = await db.query(query);

    if (sql.rows.length) return res.json(sql.rows[0]);
    res.status(404).send("User not found");
  } catch (err) {
    if (err?.constraint === "users_tag_unique") return res.json(err);
    res.status(500).json(err);
  }
});

export default router;
