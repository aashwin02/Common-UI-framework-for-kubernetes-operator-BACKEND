const express = require("express") ;
const router = express.Router() ;
const controller = require("../controller/file.controller") ;
const controller2 = require("../controller/getOper.controller") ;
const controller3 = require("../controller/getLogFiles.controller") ;
const controller4 = require("../controller/login.controller") ;
//const reader = require('xlsx') ;

console.log("Before in routes") ;
let routes = (app) => {
    console.log("in router") ;
    // router.post("/upload", controller.upload) ;
    router.post("/Operator_onboard", controller.upload) ;
    router.get("/Operators", controller2.getAllOperator) ;
    // router.get("/operatorName", (req,res) => {
    //     let data =  [] ;
    //     try {
    //         const file = reader.readFile("./database.xlsx") ;
    //         const sheetNames = file.SheetNames ;
            
    //         for ( let i = 0 ; i < sheetNames.length ; i++ ) {
    //             const arr = reader.utils.sheet_to_json(
    //                 file.Sheets[sheetNames[i]])
    //             arr.forEach((res) => {
    //                 data.push(res) ;
    //             })
    //         }
    //     } catch (err) {
    //         res.send(err) ;
    //     }
    // }) ;
    router.get("/Operator_logs", controller3.getLogs) ;
    router.post("/login", controller4.login) ;
    router.post("/signup",controller4.signup) ;
    app.use(router) ;
};

console.log("after in router") ;
module.exports = routes ;