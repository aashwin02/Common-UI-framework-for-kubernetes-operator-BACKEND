var XLSX = require('xlsx') ;
var fs = require("fs") ;
// var workbook = XLSX.readFile('./database.xlsx');
// var sheet_name_list = workbook.SheetNames;

// var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]],{
//     raw: true,
// });

function findPath(item,nm) {
    for ( let i = 0 ; i < item.length ; i++ ) {
        if ( item[i].operName == nm ) {
            return item[i].path ;
        }
    }
}

const getLogs = async(req,res) => {
    var workbook = XLSX.readFile('./database.xlsx');
    var sheet_name_list = workbook.SheetNames;

    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]],{
        raw: true,
    });
    var path ;
    var dt ;
    //var {operatorName} = req.body;
    var operatorName = req.query.operatorName ;
    // new
    var timeFilter = req.query.timefilter ; 
    console.log(timeFilter) ;
    var file = [] ;
    var currentTime = Date.now()/1000 ;
    console.log(currentTime) ;

    try {
        //var {operatorName} = req.body ;
        console.log(operatorName) ;
        path = findPath(xlData,operatorName) ;
        dt = fs.readFileSync("./resources/static/assets/uploads/" + path, "utf8" ) ;
        // new
        var i = 0 ;
        // var myObj = {
        //     "artist" : "artist",    //your artist variable
        //     "song_name" : "title"   //your title variable
        // };
        // file.push(myObj) ;    
        dt.split(/\r?\n/).forEach(line => {
            if ( line == 0 || line[0] != '{') {
                i = i + 1 ;
                console.log("empty || not starting with curly bracket") ;
            } else {
                var dumm = JSON.parse(line) ;
                var dummEpoch = dumm['ts'] ;
                if ( timeFilter == "ALL" ) {
                    //file.push(dumm) ;
                    file.push(line) ;
                } else {
                    if ( isNaN(dumm['ts']) ) {
                        var dummTime = new Date(dumm['ts']);
                        dummEpoch = dummTime.getTime()/1000.0 - 19800 ;
                    } 
                    
                    if ( dummEpoch >= currentTime - (timeFilter*60) ) {
                        file.push(line) ;
                        console.log(currentTime - dummEpoch) ;
                        console.log(`Line from file: ${dumm['ts']}`) ;
                        console.log(i) ;
                        i = i + 1 ;
                    }
                }
                // if ( dumm['ts'] >= currentTime - input ) {
                //     push below code in this block 
                // }
                //console.log(`Line from file: ${line}`);
            }
        });

        //res.status(400).json({message: path}) ;
    }
    catch(err) {
        return console.log(err) ;
    }

    //res.status(200).json({dt}) ;
    res.status(200).json(
        {
            data:
            {
                application: operatorName,
                log: file
            }
        }
    )
    //return res.status(400).json("dgdghfhgf") ;
}

module.exports = {
    getLogs
}