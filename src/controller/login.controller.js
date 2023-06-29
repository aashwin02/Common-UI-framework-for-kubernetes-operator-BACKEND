const fs = require("fs") ;

function containsObject(obj, list) {
    for ( var i = 0; i < list.length; i++) {
        if ( list[i]["email"] === obj["email"] && list[i]["password"] === obj["password"] ) {
            return true;
        }
    }

    return false;
}

console.log("a1") ;
const login = async(req,res) => {
    var userData = JSON.parse(fs.readFileSync("./users.json")) ;

    console.log(req.body) ;
    //var username = req.body.email ;
    //console.log(username) ;
    //console.log(username) ;
    console.log("b1") ;

    var credentials = { 
        email : req.body.email ,
        password : req.body.password 
    }
    if ( containsObject(credentials,userData) ) {
        return res.status(200).json(
            {
                success : 1 ,
                message : "Login successfully" ,
            }) ;
    } 
    
    return res.status(401).json(
        {
            success : 0 ,
            message : "Invalid username or password" ,
        }) ;
}

const signup = async(req,res) => {
    var credentials = { 
        "email" : req.body.email ,
        "password" : req.body.password 
    }
    
    var userData = JSON.parse(fs.readFileSync("./users.json")) ;
    console.log(userData) ;
    userData.push(credentials) ;
    console.log(userData) ;
    fs.writeFileSync('./users.json',JSON.stringify(userData)) ;
  
    return res.status(200).json(
        {
            success : 1 ,
            message : "Sign up successfully" ,
        }) ;
}
module.exports = { login , signup } ;