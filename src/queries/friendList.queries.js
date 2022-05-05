const selectFriendList = (id) => `
  SELECT friend_id, tag FROM friend_lists fl
  LEFT JOIN users u ON fl.friend_id = u.id
  WHERE user_id = ${id}
`;

const selectFriend = (friendTag) => `
  SELECT id FROM users WHERE tag = '${friendTag}'
`;

const insertFriend = (userId, friendId) => `
  INSERT INTO friend_lists (user_id, friend_id)
  VALUES (${userId},${friendId})
`;

export { selectFriend, selectFriendList, insertFriend };
