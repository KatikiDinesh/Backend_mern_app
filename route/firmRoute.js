const express = require('express');
const firmController=require('../controller/firmController');
const verifyToken= require('../middlewares/verifyToken')

const router = express.Router()


router.post('/add-firm',verifyToken,firmController.addFirm);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('content-Type','image/jpeg');
    res.sendFile(Path.join(__dirname,'..','uploads',imageName));
});


module.exports=router;
