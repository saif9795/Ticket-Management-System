const authorizedRole = (...allowedRole)=>{
    return (req, res, next) =>{
        if(!allowedRole.includes(req.user.role)){
            res.status(403).send({message : "Access Denied"})
        }
        next();
    }
}

module.exports = authorizedRole;