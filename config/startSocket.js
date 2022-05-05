import { Server } from "socket.io";
import { updateChatState } from "../src/helpers/updateChatState.helpers.js";
import { sendMessageController } from "../src/socket/sendMessageController.socket.js";

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

    updateChatState(socket);
    sendMessageController(socket);
  });
}

export { startSocket };
