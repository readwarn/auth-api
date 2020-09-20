module.exports={
    isLoggedIn:(req,res,next)=>{
        if(req.isAuthenticated()) {
            next()
        }
        else{
          console.log(req.isAuthenticated())
          res.json({
              isLoggedIn:false,
          });
        }
    }
}