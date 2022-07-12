import express from "express";

const user = [
    {
        Name: "sally",
        age: 23,
        hobby: "basket"
    },
    {
        name: "georges",
        age: 23,
        hobby: "baseball"
    },
]

const app = express();
app.get("/", (req, res)=>{
    res.send("Home")
});
app.get("/users", (req, res)=>{
    res.send(user)
});


app.listen(3000);
