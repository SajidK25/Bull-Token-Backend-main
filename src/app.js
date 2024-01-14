require("dotenv").config();
const express = require("express");
const http = require("http");
require("./connection");
const port = process.env.PORT || 8080;
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const useRouter = require("./routes/index");
const cors = require("cors");
const schedule = require("node-schedule");
const User = require("./models/userModel");

//Socket.io
io.on("connection", (socket) => {
  console.log("Socket ", socket.id);
});

app.use(express.json());

server.listen(3000, () => {
  console.log(`connection is on port ${JSON.stringify(port, null, 2)}`);

  //scheldular

  const updateCollectionParams = async () => {
    try {
      // Update all documents in the 'collections' collection where name is 'user'
      await User.updateMany({ start: true }, { start: false });
      console.log("Collection parameters updated successfully.");
    } catch (error) {
      console.error("Error updating collection parameters:", error.message);
    }
  };

  // Schedule the function to run at 12:00 AM every day

schedule.scheduleJob("15 0 * * *", updateCollectionParams);

  //scheldular
});

// middleware Router Use
app.use(cors());
app.use("/api", useRouter);
