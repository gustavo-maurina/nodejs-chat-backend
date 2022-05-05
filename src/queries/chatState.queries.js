const selectChatState = (userId) =>
  `SELECT * FROM chat_state WHERE user_id = ${userId}`;

const updateChatState = (userId, socketId) => `
  UPDATE chat_state
  SET socket_id = '${socketId}'
  WHERE user_id = ${userId}
`;

const insertChatState = (userId, socketId) => `
INSERT INTO chat_state (user_id, socket_id)
VALUES (${userId}, '${socketId}')
`;

export { selectChatState, updateChatState, insertChatState };
