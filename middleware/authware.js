module.exports={
    isLoggedIn:(req,res,next)=>{
        if(!req.isAuthenticated()) {
            res.json({
                isLoggedIn:false,
                cookies:req.cookies,
                session:req.session
            });
        }
        else{
            next()
        }
    }
}