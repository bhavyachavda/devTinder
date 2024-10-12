const express = require('express');

const app = express();

app.use("/",(req,res) => {
    res.send("hello from the dashboard!");
})
app.use("/hello",(req,res) => {
    res.send("hello hello!");
})
app.use("/users",(req,res) => {
    res.send("hello from the server!");
})

app.listen(3000, ()=>{
    console.log("Server is Successfullly listening on port 3000...");
})