const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
const knex = require('knex');

///////////////CONTROLLERS////////////////
const signin= require("./Controllers/signin");
const register= require("./Controllers/register");
const profile= require("./Controllers/profile");
const image= require("./Controllers/image");

/* --------ANOTHER OPTION FOR DB CONNECTION-----------

 const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1009",

});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
}); */

const db = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1', //localhost
        port: 3306,
        user: 'root',
        password: '1009',
        database: 'facedetector'
    }
});

app.use(cors())
app.use(bodyParser.json())


////CONECTING////////////
app.listen(3000, () => {
    console.log("listen server in port 3000")
})

app.get("/", (req, res) => {
    res.json("success")
})

/////////VERIFICACION LOGIN///////
app.post("/login", signin.handleSignin(db, bcrypt) )

//////RETORNAR USUARIOS///////////
app.get("/api/users", (req, res) => {
    db.select("*").from("users").then(data => {
        res.json(data);
    })
})
//////CREAR NUEVO USUARIO////////
app.post('/register', register.handleRegister(db, bcrypt) )

///////OBTENER DATOS DE UN USUARIO///////////
app.get("/api/profile/:email", profile.handleprofile(db, bcrypt) )

///////Solicitudes de Facedetection ///////////
app.get("/Image/:email",image.handleimage(db, bcrypt)  )
///////Solicitudes de Facedetection ///////////
app.post("/ImageURL", image.handleimageURL())