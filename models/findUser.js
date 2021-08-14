require("./index");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { databaseConnect } = require("./index");
async function findInDB(req,res){
    const creds = req.body;
    // console.log(req);
    // console.log(creds);
    const data = await databaseConnect();
    const users = data.database.collection("users");
    const user = await users.findOne({email: creds.email});
    if(!user){
        res.render("login",{message: "*email or password in wrong."});
        res.cookie("JWT_token","null",{
            expiresIn: 1000,
            httpOnly: true,
        })
        return false;
    }
    bcrypt.compare(creds.password, user.password).then((result)=>{
        if(result){
            res.cookie("JWT_token",creds.accessToken,{
                expires: new Date(Date.now()+(15*60*60*1000)),
                httpOnly: true
            });
            res.json({
                ...user,
                accessToken: creds.accessToken
            });
            // res.redirect("/home");
            return true;
        }else{
            res.cookie("JWT_token","null",{
                expiresIn: 1000,
                httpOnly: true,
            })
            res.render("login",{message: "*email or password in wrong."});
            return false;
        }
    });
}

module.exports={
    findInDB,
}