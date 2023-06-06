const upload = require('../config/multerConfig')
const path = require('path');      
const csv = require('csv-parser');  //using csv-parser to convert the data into JSON format
const fs = require('fs');
const multer = require('multer');
const uploadedFileNames = [];        //array containing the names of the uploaded files

// Note : err instanceof multer.MulterError is a check to determine if the err object is an instance of the MulterError class provided by the multer middleware.
// When handling file upload errors, multer can generate specific error types that are instances of the MulterError class. These errors occur when there are issues with file uploads, such as exceeding file size limits or invalid file formats.

module.exports.upload = (req,res)=>{
upload(req,res,(err)=>{ //
    if(err instanceof multer.MulterError){
        console.log("**** Multer error",err)
        return
    }
    else if(err){
        console.log("multer Error",err)
    }
    else if(req.file){
        uploadedFileNames.push(req.file.filename)
    }
    return res.redirect('back')
})
}

//exporting array 
module.exports.uploadedFileNames = function(){
    return uploadedFileNames;
 }

//display CSV file content
module.exports.open = (req, res) => {
    const csvParsedData = []; // Array to store data in JSON format
  
    const index = req.query.index; // Retrieve the index value from the query parameters
  
    // Create a readable stream for the CSV file
    fs.createReadStream(path.join(__dirname, '../', '/uploads', uploadedFileNames[index]))
      .pipe(csv()) // Pipe the file stream to the CSV parser
      .on('data', (data) => csvParsedData.push(data)) // Push each parsed data row to csvParsedData array
      .on('end', () => {
        // When parsing is complete
        return res.render('Show_data', {
          csvData: csvParsedData // Pass the parsed CSV data to the 'Show_data' view template
        });
      });
  };
  
//for deleting a particular csv file
module.exports.delete = function(req,res){
    let index = req.query.index;
    try { var files = fs.readdirSync(path.join(__dirname,'..','/uploads')); }
      catch(e) { return; }
      if (files.length > 0){
          var filePath = path.join(__dirname,'..','/uploads',uploadedFileNames[index]);
          if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
      }
      uploadedFileNames.splice(index,1);
      return res.redirect('back');
  }