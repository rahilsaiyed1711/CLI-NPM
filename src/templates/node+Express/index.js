const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port=3000
const connectTomongodb=require("./config/connection")
connectTomongodb()
const authRoutes = require("./routes/user.route");
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/auth", authRoutes);

// Start Server
app.listen(port,console.log("server started"))
