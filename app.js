const express=require('express');
const bodyParser=require('body-parser');
const cookieParser = require("cookie-parser");
const passport=require('passport');
const app=express();
app.use(cookieParser('secret'));
app.use(require('express-session')({
  secret:'we now in the authetic world..yaga',
  resave:false,
  saveUninitialized:false,
  cookie:{
    sameSite: false, // i think this is default to false
    maxAge: 60 * 60 * 1000
  }
}));
app.use(passport.initialize());
app.use(passport.session());
const passportSetup=require('./config/oauthStrategy');
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/oauth',{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false});
mongoose.connection.on('connected', function(){
  console.log('connected');
});


const PORT=3000 ||process.env.PORT;
const auth=require('./routes/auth');
const user=require('./routes/user')
app.use('/auth', auth);
app.use('/user',user);

app.listen(PORT, ()=>{
    console.log('server started');
})