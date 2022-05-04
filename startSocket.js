import { Server } from "socket.io";
import { updateChatState } from "./updateChatState.js";

export let mockData = [];

function startSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    console.log("nova conexão socket", socket.id);

    try {
      await updateChatState(socket.id, socket.handshake.query.userId)
      console.log('chat state updated! $$$');
    } catch (err) {
      console.log(err)
      socket.disconnect()
    }

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
  });
}

export { startSocket };

