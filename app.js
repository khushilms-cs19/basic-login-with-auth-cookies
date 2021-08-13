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





app.get("/",function(req,res){
    res.redirect("/signup");
});


//under the get and post of /signup
app.get("/signup", function(req,res){
    // res.sendFile(__dirname + "/public/HTML/signup.html");
    res.render("signup",{message: null});
});

app.post("/signup", function(req,res){
    addToDB(req.body,res);
});


// for the get and post of the /login
app.get("/login", function(req,res){
    // res.sendFile(__dirname + "/public/HTML/login.html");
    res.render("login",{message: null});
});

app.post("/login", function(req, res){
    findInDB(req.body,res);
});

//success login 
app.get("/success", function(req,res){
    res.sendfile(__dirname + "/public/HTML/success.html");
});


app.listen(3000, function(){
    console.log("The server is running at port 3000.");
});
