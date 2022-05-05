const sendMessageController = (socket) => {
  socket.on("send-message", (params) => {
    const { recipient, message, timeSent } = params;
    console.log(params);
    socket.broadcast.to(recipient).emit("receive-message", {
      recipients: [recipient],
      senderId: socket.id,
      message,
      timeSent,
    });
  });
};

export { sendMessageController };
