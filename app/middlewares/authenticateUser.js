const jwt = require('jsonwebtoken')


const authenticateUser = (req, res, next)=>{
    const token = req.headers['authorization']
    if(!token){
        return res.status(400).json({error: 'Token is required'})
    }
    try{
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            id: tokenData.id, 
            role: tokenData.role
        }
        next()
    }catch(err){
        return res.status(400).json({error: err})
    }
}

module.exports = authenticateUser


// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
//     const decoded = jwt.verify(token, 'process.env.JWT_SECRET');
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Authentication failed' });
//   }
// };

// const jwt = require('jsonwebtoken');

// const authenticateUser = (req, res, next) => {
//   try {
//     if (!req.headers.authorization) throw new Error("No token provided");

//     const token = req.headers.authorization.split(' ')[1]; // Assumes 'Bearer <token>'
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Authentication failed', error: error.message });
//   }
// };

// module.exports = authenticateUser