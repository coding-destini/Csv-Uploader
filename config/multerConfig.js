const multer = require('multer')
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../','/uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname + '-' + uniqueSuffix)
    }
  })
  
//setting up file-filter to upload only (.csv) files
function fileFilter (req, file, cb) {

  if(file.mimetype == 'text/csv'){
      cb(null,true);
  }
  else{
      console.log("File is not csv type");
      cb(null,false);
  }
}
//make sure that .single(name should be same as in form field)
  const upload = multer({ storage: storage ,fileFilter:fileFilter}).single('uploaded_file')
  module.exports=upload