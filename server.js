process.env.NODE_ENV = process.env.NODE_ENV || "dev";
const debug = require("debug")("api");
const app = require("./src/app/app");
const http = require("http");
const {
  addUser,
  removeUser,
  getUsersInRoom,
} = require("./src/controllers/users");
const cors = require("cors");
const MsgModel = require("./src/schemas/message.schema");

/**
 * Get port from environment and store in Express.
 */
const port = normalize_port(process.env.PORT); //(config.server.api_port || '8080');
app.set("port", port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

const socketIo = require("socket.io");
const io = socketIo(server, {
  cors: {
    "Access-Control-Allow-Origin": "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const USER_JOIN_CHAT_EVENT = "USER_JOIN_CHAT_EVENT";
const USER_LEAVE_CHAT_EVENT = "USER_LEAVE_CHAT_EVENT";
const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT";
const START_TYPING_MESSAGE_EVENT = "START_TYPING_MESSAGE_EVENT";
const STOP_TYPING_MESSAGE_EVENT = "STOP_TYPING_MESSAGE_EVENT";

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  console.log(socket.handshake);
  // Join a conversation
  const { roomId, name, picture, id } = socket.handshake.query;
  socket.join(roomId);

  const user = addUser(socket.id, roomId, name, picture);
  io.in(roomId).emit(USER_JOIN_CHAT_EVENT, user);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, async (data) => {
    const newMsg = {
      senderId: data.user.id,
      to: roomId,
      text: data.body,
    };
    const info = await MsgModel.create(newMsg);
    const m = {
      body: data.body,
      senderId: socket.id,
      user: {
        picture: "/Messanger/static/media/avatar.79bfd233.png",
        name: data.user.name,
        id: data.user.id,
      },
    };
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, m);
  });

  // Listen typing events
  socket.on(START_TYPING_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(START_TYPING_MESSAGE_EVENT, data);
  });
  socket.on(STOP_TYPING_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(STOP_TYPING_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.in(roomId).emit(USER_LEAVE_CHAT_EVENT, user);
    socket.leave(roomId);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalize_port(val) {
  const port = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) return val;

  // port number
  if (port >= 0) return port;

  return false;
}

/**
 * Event listener for HTTP server 'error' event.
 */
function on_error(error) {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  console.log(
    "-------------------- App unexpectedly stopped --------------------"
  );
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.log(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server 'listening' event.
 */
function on_listening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

  debug("Listening on " + bind);
}

module.exports = app;
