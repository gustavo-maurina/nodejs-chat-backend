import { db } from "../../config/db.js";
import {
  insertChatState,
  selectChatState,
} from "../queries/chatState.queries.js";

async function updateChatState(socket) {
  const socketId = socket.id;
  const userId = socket.handshake.query.userId;

  try {
    const userChatState = await db.query(selectChatState(userId));
    const hasRecord = !!userChatState.rows.length;

    if (hasRecord) return await db.query(updateChatState(userId, socketId));

    await db.query(insertChatState(userId, socketId));
  } catch (err) {
    console.log(err);
    socket.disconnect();
  }
}

export { updateChatState };
