const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
const path = require("path");

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Socket Connection and All Activity
io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
        console.log('Debug:', data);

    });

    socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
        // Optionally notify clients that the user has disconnected
        io.emit("user-disconnected", { id: socket.id });
    });
});

// Render index.ejs on the root route
app.get("/", function(req, res) {
    console.log("Index EJS is Rendering");
    res.render("index");
});

// Start the server
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});