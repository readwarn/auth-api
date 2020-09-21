const express=require('express');
const bodyParser=require('body-parser');
const cookieParser = require("cookie-parser");
const passport=require('passport');
const mongoose=require('mongoose');
const auth=require('./routes/auth');
const user=require('./routes/user');
const app=express();
mongoose.connect('mongodb+srv://reelee:physics522@cluster0.ltxb6.mongodb.net/oauth?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false});
mongoose.connection.on('connected', function(){
  console.log('connected');
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('secret'));
app.use(require('express-session')({
  secret:'we now in the authetic world...yay yay',
  resave:false,
  saveUninitialized:false,
}));
app.use(passport.initialize());
app.use(passport.session());
const passportSetup=require('./config/oauthStrategy');
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', 'https://hungry-shirley-b0e560.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.get('/',(req,res)=>{
  res.send('home');
})
app.use('/auth', auth);
app.use('/user',user);

app.listen(process.env.PORT || 3000,function(){
  console.log("running");
})