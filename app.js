const express = require('express');

const app = express();

const session=require('express-session');
const passport=require('passport');
const localstrategy=require('passport-local').Strategy;

app.use(express.urlencoded({extended:false}));

app.use(session({
    secret:"secret",
    resave:false,
    saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session());

authUser=(user,password,done)=>{
    console.log(`value of user is authuser function-->${user}`);
    console.log(`value of password is authuser function-->${password}`);

    let authenticated_user={id:123,name:"Kyle"};

    return done(null,authenticated_user)
}

passport.use(new localstrategy(authUser));

passport.serializeUser((user,done)=>{
    console.log("serialize user"),
    console.log(user);
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    console.log("deserialize user");
    console.log(id);

    done(null,{name:"Kyle",id:123});
})

let count=1;
printData=(req,res,next)=>{
    console.log(`req.body.username-->${req.body.username}`)
    console.log(`req.body.password-->${req.body.password}`)
    next();

}

app.use(printData);
app.listen(3001,()=>{
    console.log("server started on port 3001")
})

app.get("/login",(req,res)=>{
    res.render("login.ejs");
})

app.post("/login",passport.authenticate('local',{
    successRedirect:"/dashboard",
    failureRedirect:"/login",
}))

app.get('/dashboard',(req,res)=>{
    res.render("dashboard.ejs",{name:req.user.name})
})