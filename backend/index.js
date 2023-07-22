const path = require("path");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const formatMessage = require("./utils/messages");
const cors = require('cors');
require("dotenv").config();
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5173",
        methods: ["GET", "POST"],
    }
});

app.use(cors())
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "ChatCord Bot";


io.on("connection", (socket) => {
    // console.log(io.of("/").adapter);
    socket.on("joinRoom", ({ username, room }) => {
        const id = socket.id;
        const user = userJoin(id, username, room);
        console.log(user);

        // socket.on('shoot', () => {
        socket.join(user.room);

        // Welcome current user
        socket.emit("welcomeMsg", { msg: formatMessage('chatCord Bot', 'welcome to Chatcord'), id, username });
        // formatMessage(botName, "Welcome to ChatCord!")
        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit(
                "message",
                formatMessage(botName, `${user.username} has joined the chat`)
            );

        // Send users and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
        });
        // })

    });

    // Listen for chatMessage
    socket.on("chatMessage", ({ msg, id }) => {
        const user = getCurrentUser(id);
        console.log('here', user);
        console.log(socket.id);

        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                "message",
                formatMessage(botName, `${user.username} has left the chat`)
            );

            // Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));