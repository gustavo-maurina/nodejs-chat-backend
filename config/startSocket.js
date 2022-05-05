import { Server } from "socket.io";
import { refreshChatState } from "../src/helpers/updateChatState.helpers.js";

function startSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    console.log("nova conexão socket", socket.id);
    console.log(await io.allSockets());

    await refreshChatState(socket);
    // sendMessageController(socket);
  });
}

export { startSocket };
