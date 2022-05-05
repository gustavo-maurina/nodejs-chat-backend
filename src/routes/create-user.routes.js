import { Router } from "express";
import { db } from "../../config/db.js";

const router = Router();

router.route("/create-user").post(async (req, res) => {
  try {
    const query = `INSERT INTO users (tag) VALUES ('${req.body.userTag}') RETURNING id`;
    const sql = await db.query(query);
    res.json(sql.rows[0]);
  } catch (err) {
    res.status(500).send("Internal Error");
  }
});

export default router;
