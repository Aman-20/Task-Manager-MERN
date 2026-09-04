const {getUser} = require("../service/jwt");

function checkAuth(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.json({message:"unauthorized"});
    }

    try{
        const userInfo = getUser(token);
        req.user = userInfo;
        next();
        
    } catch(err){
        return res.json({message:"invailed Token"});
    }

}

module.exports = {checkAuth};