import store from "./redux/store";

export default socket => {
  console.log("someone connected");

  socket.on("disconnect", () => {
    console.log("he left again...");
  });

  socket.on("update", () => {
    socket.emit("update", store.getState());
  });

  socket.on("action", action => {
    console.log("received", action);
    store.dispatch(action);
  });
};
