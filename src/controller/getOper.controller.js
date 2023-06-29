const XLSX = require("xlsx") ;
//var workbook = XLSX.readFile('./database.xlsx');

const getAllOperator = async(req,res,next) => {
    var workbook = XLSX.readFile('./database.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]],{
            raw: true,
        });
    let name = [] ;
    function myfunction(item) {
        name.push(item.operName) ;
    }

    try {
        xlData.forEach(myfunction) ;
        console.log(typeof name) ;
        console.log(xlData) ;
        console.log(name) ;
    } catch (err) {
        return console.log(err) ;
    }

    // if ( name.length == 0 ) {
    //     return res.status(400).send({message: "No operators found" }) ;
    // }

    return res.status(200).json(
        {
            data:
            {
                applications: name 
            }
        }) ;
}

module.exports = { getAllOperator } ;