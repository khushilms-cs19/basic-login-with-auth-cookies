require("./index");
const bcrypt = require('bcrypt');
const { databaseConnect } = require("./index");
async function findInDB(creds,res){
    console.log(creds);
    const data = await databaseConnect();
    const users = data.database.collection("users");
    const user = await users.findOne({email: creds.email});
    if(!user){
        res.render("login",{message: "*email or password in wrong."});
        return;
    }
    bcrypt.compare(creds.password, user.password).then((result)=>{
        if(result){
            res.render("success");
        }else{
            res.render("login",{message: "*email or password in wrong."})
        }
    });
}

module.exports={
    findInDB,
}