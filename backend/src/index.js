const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./config/db");
const cookieParser = require("cookie-parser");

// Import routes
const router = require("./routes/userRoutes");
const routes = require("./routes/adminRoutes");
const problemRouter = require("./routes/problemRoutes");

app.use(express.json());
app.use(cookieParser());

// DB connection + start server
main().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("🚀 Server listening at port number: " + process.env.PORT);
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("hello, server is working");
});

// User routes
app.use("/api/users", router);
app.use("/api/admin",routes);
app.use("/api/problems", problemRouter);  