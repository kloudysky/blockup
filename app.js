const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const app = express();
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const rooms = require("./routes/api/rooms");
const messages = require("./routes/api/messages");
const friendships = require("./routes/api/friendships")

const PORT = process.env.PORT || 5000;

const http = require('http').Server(app);
const io = require('socket.io')(http);
const Message = require('./models/Message');


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);
//require("./config/twofapassport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/rooms", rooms);
app.use("/api/messages", messages);
app.use("/api/friendships", friendships);

io.on('connection', (socket) => {

  // Get the last 10 messages from the database.
  Message.find().sort({createdAt: -1}).limit(10).exec((err, messages) => {
    if (err) return console.error(err);

    // Send the last messages to the user.
    socket.emit('init', messages);
  });

  // Listen to connected users for a new message.
  socket.on('message', (msg) => {
    // Create a message with the content and the name of the user.
    const message = new Message({
      content: msg.content,
      
    });

    // Save the message to the database.
    message.save((err) => {
      if (err) return console.error(err);
    });

    // Notify all other users about a new message.
    //////will this give to all users or just users associated with message?///
    socket.broadcast.emit('push', msg);
  });
});

http.listen(PORT, () => {
  console.log('listening on *:' + `${PORT}`);
});