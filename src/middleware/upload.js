const util = require("util") ;
const multer = require("multer");
const XLSX = require('xlsx') ;

//const file = reader.readFile("./database.xlsx") ;

const maxSize = 20 * 1024 * 1024 ;
console.log("before") ;
var operName = "njjd" ;
//var id = 5 ;
var operPath = "" ;
var storage = multer.diskStorage({
    destination: (req,file,cb) => {
        //oper = req.body.name ;
        var workbook = XLSX.readFile('./database.xlsx');
        console.log(req.body.name) ;
        var nm = req.body.name;
        //console.log(nm) ;
        var sheet_name_list = workbook.SheetNames;
        operPath = file.originalname ;
        XLSX.utils.sheet_add_aoa(workbook.Sheets[sheet_name_list[0]] , 
            [[nm , operPath ]] ,
            { origin : -1 }) ;
        XLSX.writeFile(workbook,"./database.xlsx") ;
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]],{
                raw: true,
                // range: "B1:B3",
                // header: "B",
                // defval: null,
                //header: 1 ,
                //range: "B" ,
                //blankrows:false
                //blankrows: false
        });
        XLSX.readFile('./database.xlsx') ;
        //console.log(xlData) ;
        // path = file.originalname ;
        // let dt = [{
        //     id: 1 ,
        //     operName: oper ,
        //     path: operPath
        // }]
        // const ws = reader.utils.json_to_sheet(dt) ;
        // reader.utils.book_append_sheet(file,ws,"Sheet2") ;
        // reader.writeFile(file,"./database.xlsx") ;

        //console.log(oper) ;
        cb(null, __basedir + "/resources/static/assets/uploads/") ;
    },
    filename: (req, file, cb) => {
        path = file.originalname ;
        console.log(file) ;
        //console.log(req) ;
        cb(null, file.originalname) ;
    }
}) ;

// let dt = [{
//     id: 1 ,
//     operName: oper ,
//     path: operPath 
// }]

console.log("after") ;
// const ws = reader.utils.json_to_sheet(dt) ;
// reader.utils.book_append_sheet(file,ws,"Sheet2") ;

// reader.writeFile(file,"./database.xlsx") ;

let uploadFile = multer({
    storage: storage ,
    limits: { fileSize: maxSize } ,
}).single("file") ;

let uploadFileMiddleware = util.promisify(uploadFile) ;
module.exports = uploadFileMiddleware ;