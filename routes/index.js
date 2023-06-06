const router = (require('express')).Router();
const homeController = require('../controller/homeController')

router.use('/file',require('./file'))
router.get('/',(req,res)=>{
    return res.render('home')
})
router.get('/allData',homeController.Files)

module.exports=router;