import { db } from "../../config/server.js";
import {
  insertChatState,
  selectChatState,
  updateChatState,
} from "../queries/chatState.queries.js";

const refreshChatState = async (socket) => {
  const socketId = socket.id;
  const userId = socket.handshake.query.userId;

  try {
    console.log(selectChatState(userId));
    console.log(updateChatState(userId, socketId));
    console.log(insertChatState(userId, socketId));
    const userChatState = await db.query(selectChatState(userId));
    const hasRecord = !!userChatState.rows.length;

    if (hasRecord) return await db.query(updateChatState(userId, socketId));

    await db.query(insertChatState(userId, socketId));
  } catch (err) {
    console.log(err);
    socket.disconnect();
  }
};

export { refreshChatState };
