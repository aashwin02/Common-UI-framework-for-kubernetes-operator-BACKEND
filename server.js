const cors = require("cors") ;
const express = require("express") ;
const app = express() ;

global.__basedir = __dirname ;

var corsOptions = {
    origin: "http://localhost:8081" 
};

app.use(cors()) ;
app.use(express.json()) ;

const initRoutes = require("./src/routes") ;
console.log("in server") ;
app.use(express.urlencoded({ extended: true })) ;
initRoutes(app) ;

// app.post("/login", (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     console.log("Username: " + email);
//     console.log("Password: " + password);
//     console.log(req.body) ;
//     res.send("Data received");
//   });

let port = 8080 ;
app.listen(port, () => {
    console.log(`Running at localhost:${port}`) ;
}) ;