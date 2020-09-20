const router=require('express').Router();
const passport=require('passport');
const UserServices = require('../models/user');

router.get('/google',passport.authenticate('google',{scope:['profile']}));
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
  res.redirect('https://hungry-shirley-b0e560.netlify.app');
});

router.get('/github',passport.authenticate('github',{scope:['user:email']}));

router.get('/github/redirect',passport.authenticate('github'),(req,res)=>{
    res.redirect('https://hungry-shirley-b0e560.netlify.app');
});

router.get('/facebook',passport.authenticate('facebook'));

router.get('/facebook/redirect',passport.authenticate('facebook'),(req,res)=>{
  res.redirect('https://hungry-shirley-b0e560.netlify.app');
});

router.post('/register', function (req,res,next){
     UserServices.User.findOne({username:req.body.username}).then((user)=>{
         if(user){
           return res.json({message:'username is already taken'});
         }
         else{
          new UserServices.User({
            username:req.body.username,
            password:req.body.password
          }).save().then((newUser)=>{
            passport.authenticate('local', function(err, user, info) {
              if (err) { return next(err) }
              if (!user) {
                return res.json({ message: info.message, loggedIn:false })
              }
              req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.json({loggedIn:true});
              });
            })(req, res, next);
          })
         }
     });
})

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.json({ message: info.message, loggedIn:false })
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({loggedIn:req.isAuthenticated(), user:req.user});
    });
  })(req, res, next);
});

router.get('/logout',(req,res)=>{
   req.logout();
   res.send(req.user);
});

router.get('/lg',(req,res)=>{
  res.send(req.user);
})

module.exports=router;