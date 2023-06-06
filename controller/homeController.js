const fileController = require('../controller/fileController')

const uploadedFileNames=fileController.uploadedFileNames;
const array = uploadedFileNames(); //This is the array containing the csv files

module.exports.Files = (req,res)=>{
    return res.render('show_all_files',{
        files:array
    })
}

