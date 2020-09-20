const router=require('express').Router();
const Authenticator=require('../middleware/authware');
const UserServices=require('../models/user');
router.get('/',Authenticator.isLoggedIn,(req,res)=>{
    res.json({
      user:req.user,
      isLoggedIn:true,
    });
});

router.post('/',Authenticator.isLoggedIn,(req,res)=>{
   UserServices.User.findOneAndUpdate({username:req.user.username},req.body).then((user)=>{
       res.json({
         isLoggedIn:true
       })
   })
})

module.exports=router;