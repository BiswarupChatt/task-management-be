const authorizeUser = (permission)=>{
    return (req, res, next)=>{
        if(permission.includes(req.user.role)){
            next()
        }else{
            res.status(403).json({error: 'Unauthorized user'})
        }
    }
}

module.exports = authorizeUser