import { client } from "./db.js";

async function updateChatState(socketId, userId) {
  const selectQuery = `SELECT * FROM chat_state WHERE user_id = ${userId}`;
  const sql = await client.query(selectQuery)
  const hasRecord = !!sql.rows.length

  if (hasRecord) {
    const updateQuery = `
      UPDATE chat_state
      SET socket_id = '${socketId}'
      WHERE user_id = ${userId}
    `;
    await client.query(updateQuery);
    return;
  }

  const insertQuery = `
    INSERT INTO chat_state (user_id, socket_id)
    VALUES (${userId}, '${socketId}')
  `;
  await client.query(insertQuery)
}

export { updateChatState };

