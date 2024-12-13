const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { header } = require("express/lib/request");
const jwt = require("jsonwebtoken");

const userRegistration = async(req, res)=>{
    try {
        const {fullName, userName, email, role, password} = req.body;
    if(fullName != null || userName != null || email != null|| role !=null || password != null){
        const hashedPassword = await bcrypt.hash(password, 10);
        const userInfo = new User({
            fullName : fullName,
            userName : userName,
            email : email,
            role : role,
            password : hashedPassword
        });
        const saveUser = await userInfo.save();
        res.status(201).send({
            message : "User Created"
        });
    }
    else{
        res.status(400).send({
            message : "Must Enter all the Info!"
        });
    }
    } catch (error) {
        res.status(500).send({
            message : error.message
        });
    }
};

const userLogin = async(req, res)=>{
    try {
        const {userName, password} = req.body;
    const user = await User.findOne({userName});
    if(!user){
        res.status(404).send({message : "No user found"});
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if(!isMatched){
        res.status(400).send({message : "Wrong Password"});
    }
    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1h"});

    res.status(200).json({
        message : "Login Successful",
        token});
    } catch (error) {
        res.status(500).send({message : error.message});
    }
};

const userLogout = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
  
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const expiredToken = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '0s' });
  
      res.clearCookie('token'); 
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging out' });
    }
  };

module.exports = {userRegistration, userLogin, userLogout};