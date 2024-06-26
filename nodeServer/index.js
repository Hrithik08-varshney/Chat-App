//node server to handle socket io connections

const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
  },
});

const users = {};
//server to listen incoming events
io.on("connection", (socket) => {
  //particular connection handle ->  event acceptance
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name); //jis insan ne join kiya usko chodkar sabko event emit kar dega
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});

//41.27
