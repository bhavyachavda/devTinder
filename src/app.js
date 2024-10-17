const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

// const { adminAuth, userAuth } = require("./middlewares/auth");

// Handle Auth Middleware for all request GET, POST, PUT AND DELETE request
// app.use("/admin", adminAuth);

// app.post("/user/login", (req, res) => {
//   res.send("User logged in successfully");
// });

// app.get("/user/data", userAuth, (req, res) => {
//   res.send("User Data Sent");
// });

// app.get("/admin/getAllData", (req, res) => {
//   res.send("All Data sent");
// });

// app.get("/admin/deleteUser", (req, res) => {
//   // Logic of checking if the request is authorized
//   res.send("Deleted a user");
// });

app.post("/signup", async (req, res) => {
  //Creating a new Instance of the user model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully!");
  } catch (error) {
    res.status(400).send("Error saving the user:" + error.message);
  }
});

// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("User not found");
    // } else {
    //   res.send(users);
    // }
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(400).send("user not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.send(400).send("something went wrong");
  }
});

// Feed API - GET /feed -get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

// Delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // const user = await User.findByIdAndDelete({_id: userId})
    const user = await User.findByIdAndDelete(userId);
    res.send("user delete successfully");
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

// update data of the user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ _id: userId }, data, {
        runValidators: true,
    });
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Update failed: " + error.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is Successfullly listening on port 3000...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!");
  });
