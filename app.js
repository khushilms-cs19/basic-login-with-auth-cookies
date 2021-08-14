const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//data controllers.

const {addToDB} = require("./models/addData");
const {findInDB} = require("./models/findUser");
const { authenticate } = require("passport");
const jwt = require("jsonwebtoken");





app.get("/",function(req,res){
    res.redirect("/signup");
});


//under the get and post of /signup
app.get("/signup", function(req,res){
    res.render("signup",{message: null});
});

app.post("/signup", function(req,res){
    addToDB(req.body,res);
});


// for the get and post of the /login
app.get("/login", function(req,res){
    res.render("login",{message: null});
});

app.post("/login", async function(req, res){
    const email = req.body.email;
    const user = {email : email};
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    req.body.accessToken=accessToken;
    findInDB(req,res);
});





//success login 
function authenticateToken(req,res,next){

    const token = req.headers.cookie.split("=")[1];
    if(token==null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })

}
app.get("/home", authenticateToken , function(req,res){
    res.sendFile(__dirname + "/public/HTML/success.html");
});


app.listen(process.env.PORT || 3000, function(){
    console.log("The server is running at port 3000.");
});
