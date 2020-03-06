import path from "path";
import express from "express";
import http from "http";
import socket from "socket.io";

import handle from "./server";
import store from "./server/redux/store";

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

io.on("connection", socket => {
  handle(socket);
});

store.subscribe(() => {
  io.emit("update", store.getState());
});

server.listen(8080);
