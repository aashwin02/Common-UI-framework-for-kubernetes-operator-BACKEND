const uploadFile = require("../middleware/upload") ;

console.log("Before in controller") ;
const upload = async (req, res) => {
    console.log("before try in controller") ;
    console.log(req.body) ;
    try {
        console.log("IN TRY IN CONTROLLER") ;
        await uploadFile(req, res) ;
        if (req.file == undefined) {
            return res.status(400).send({ 
                data:
                {
                    status: "failure" ,
                    message:  "Please upload a file!"
                }
            }) ;
        }
        
        if (req.body == undefined) {
            return res.status(400).send({ message: "Please fill operator name!" }) ;
        }

        res.status(200).send({
            data:
            {
                status: "success" ,
                message: "Uploaded the file successfully: " + req.file.originalname
            }
            
        }) ;
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 20MB!",
            }) ;
        }

        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}` ,
        });
    }

} ;

console.log("After in controller") ;
module.exports = {
    upload
} ;