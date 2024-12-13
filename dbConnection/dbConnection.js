const { default: mongoose } = require("mongoose");

const dotenv = require("dotenv").config();

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.db_url);
        console.log("DB is connected")
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = dbConnection;