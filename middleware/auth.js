const jwt = require('jsonwebtoken');
const User = require('../models/User');


const JWTAuthMiddleware = async(req, res, next) => {
    const cookies = req.headers.cookie;
    if(!cookies){
        return res.send({
            status: "error",
            msg: "No token, authorization denied",
            auth: false
            })
    }

    const token = cookies.split(' ').filter(e=>e.includes('token'))
    if(token.length == 0){
        return res.send({
            status: "error",
            msg: "No token, authorization denied",
            auth: false
            })
    }

    // Token is in format 'token=tokenvalue' → Must remove 'token='
    try{
        let jwtToken = token[0]
        jwtToken = jwtToken.slice(jwtToken.indexOf('=')+1)

        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userData = await User.findOne({_id: isVerified.id}).select("-password");

        req.user = userData;
        req.userId = userData._id.toString();
        next()
    }catch(err){
        return res.send(err)
    }
}

module.exports = JWTAuthMiddleware;