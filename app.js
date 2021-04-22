const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const app = express();
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const rooms = require("./routes/api/rooms");
const messages = require("./routes/api/messages");
const friendships = require("./routes/api/friendships");
const friendRequests = require("./routes/api/friendRequests");

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const Message = require("./models/Message");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/rooms", rooms);
app.use("/api/messages", messages);
app.use("/api/friendships", friendships);
app.use("/api/friendRequests", friendRequests);

io.on("connection", (socket) => {
  app.locals.socket = socket;

  socket.on('join video chat', (roomId, userId) => {
  
    console.log("video_room: ", roomId, "user: ", userId,"**************")
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId)

    socket.on("disconnect", () => {
      console.log(" server disconnect**************************")
      socket.broadcast.to(roomId).emit('user-disconnected', userId)
    })
  })

  socket.on("join room", (room) => {
    console.log("ROOM ID", "------");
    console.log(room);
    socket.join(room);
  });

  socket.on("leave room", (room) => {
    socket.leave(room);
  });
});

http.listen(PORT, () => {
  console.log("listening on *:" + `${PORT}`);
});
