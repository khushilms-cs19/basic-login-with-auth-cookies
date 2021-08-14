require("dotenv").config();
const { MongoClient } = require("mongodb");
const url = process.env.MONGODB_URL;

const client = new MongoClient(url);

const db = {};

async function databaseConnect(){
    await client.connect();
    console.log("The client has been connected.");
    const database = client.db("templogin");
    console.log("The database has been created.");
    db.client=client;
    db.database=database;
    return db;
}

module.exports = {
    databaseConnect,
}
