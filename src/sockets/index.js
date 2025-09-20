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

// Purifier events
export const emitPurifierCreated = (purifier) => {
  const socketIo = getIo();
  socketIo.emit("purifier:created", purifier);
};

export const emitPurifierUpdated = (purifier) => {
  const socketIo = getIo();
  socketIo.emit("purifier:updated", purifier);
};

export const emitPurifierDeleted = (purifierId) => {
  const socketIo = getIo();
  socketIo.emit("purifier:deleted", { id: purifierId });
};

export const emitPurifierToggled = (purifier) => {
  const socketIo = getIo();
  socketIo.emit("purifier:toggled", purifier);
};
