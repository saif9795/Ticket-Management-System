const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];

        if(!token){
            res.status(401).send({message : "Authorization Denied"});
        }
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        res.status(400).send({message : "Invalid Token"})
    }


}

module.exports = verifyToken;