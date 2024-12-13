const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required: true
    },
    userName : {
        type: String,
        minLength: [6, "Must be of 6 characters"],
        maxLength: [10, "Must not Exceed 10 characters"],
        unique: [true, "Username exists. Try a new one!"], 
        required: true
        
    },
    email:{
        type: String,
        unique: [true, "Email exists!"],
        required: true
        
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true
    },
    password:{
        type: String,
        required: true
        
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const User = mongoose.model("User",userSchema);

module.exports = User;