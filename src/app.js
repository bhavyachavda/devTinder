const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

// Handle Auth Middleware for all request GET, POST, PUT AND DELETE request
app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("User logged in successfully");
});

app.get("/user/data", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  // Logic of checking if the request is authorized
  res.send("Deleted a user");
});

app.listen(7777, () => {
  console.log("Server is Successfullly listening on port 3000...");
});
