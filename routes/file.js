const router = (require('express')).Router();
const fileController = require('../controller/fileController')

// router.post('/SignUp',userController.signUp)
// router.post('/SignIn',userController.signIn)

router.post('/upload',fileController.upload)

router.get('/data',fileController.open)

router.get('/delete',fileController.delete); 
   //route for deleting a particular file
module.exports=router;