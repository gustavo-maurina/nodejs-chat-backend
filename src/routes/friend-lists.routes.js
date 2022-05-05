import { Router } from "express";
import { db } from "../../config/server.js";
import {
  insertFriend,
  selectFriend,
  selectFriendList,
} from "../queries/friendList.queries.js";

const router = Router();

router.route("/friend-lists/:id").get(async (req, res) => {
  try {
    const { rows } = await db.query(selectFriendList(req.params.id));
    res.json(rows);
  } catch (err) {
    res.json("Internal error");
  }
});

router.route("/friend-lists").post(async (req, res) => {
  try {
    const friendIdQuery = await db.query(selectFriend(req.body.friendTag));

    await db.query(insertFriend(req.params.userId, friendIdQuery.rows[0].id));
    res.json("Success");
  } catch (err) {
    res.json("Internal error");
  }
});

export default router;
