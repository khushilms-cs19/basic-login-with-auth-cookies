require("./index");

//for hashing.
const bcrypt = require("bcrypt");
const saltRounds = 10;
//for database
const {databaseConnect} =require("./index");



async function addToDB(creds,res){
    const data = await databaseConnect();
    const users = data.database.collection("users");
    await users.findOne({email: creds.email}).then(async(currentUser)=>{
        if(currentUser){
            console.log("the user already exists.");
            res.render("signup", {message: "*the user already exists"});
        }else{
            await bcrypt.hash(creds.password, saltRounds).then(async(hash)=>{
                const user = await users.insertOne(
                    {
                        name: creds.name,
                        email: creds.email,
                        password: hash,
                    }
                );
            })
            console.log("A new entry has been made in the DB.");
        }
    });
}

module.exports= {
    addToDB,
}
