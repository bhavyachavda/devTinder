const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect("mongodb+srv://bhavyachavda55:wmJFuuY9yhL6dpdd@namastenode.rubz8.mongodb.net/devTinder");
};

module.exports= connectDB;
