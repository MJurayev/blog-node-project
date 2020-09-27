const jwt = require('jsonwebtoken');
const config = require('config');

module.exports= auth =(req, res, next)=>{
const token  = req.header('m-auth-token');
if(!token)
    return res.status(401).send('token bo\'lmaganligi sababli so\'rov rad etildi');
    try {
        const decoded = jwt.verify(token, config.get(jwtPrivateKey));
        req.user = decoded;
        next();
    } catch (ex) {
        return res.status(400).send("yaroqsiz token");
    }
    
}