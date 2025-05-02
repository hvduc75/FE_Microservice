import { io } from "socket.io-client";

let socket;
const listeners = [];

const createSocketConnection = (accessToken) => {
  socket = io("http://localhost:8085", {
    auth: {
      token: accessToken,
    },
  });

  socket.on("connect", () => {
    console.log("🔌 Socket connected:", socket.id);
  });

  socket.on("notification", (data) => {
    console.log("🔔 Notification received:", data);
    listeners.forEach((cb) => cb(data));
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });
};

const onNotification = (callback) => {
  listeners.push(callback); // cho phép nhiều callback
};

export { createSocketConnection, onNotification };
