// src/sockets/index.js
let io;

export const initSocket = (serverInstance) => {
  io = serverInstance;

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

export const getIo = () => {
  if (!io) {
    throw new Error('Socket.io not initialized.');
  }
  return io;
};

export const emitPurifierUpdate = (purifier) => {
  const socketIo = getIo();
  socketIo.emit("purifierUpdate", purifier);
};