const { getUser } = require("../service/jwt");

function checkAuth(req, res, next) {
    
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: no token provided" });
    }

    const userInfo = getUser(token);
    if(!userInfo){
        return res.status(401).json({ success: false, message: "Unauthorized: invalid or expired token" });
    }

    req.user = userInfo;
    return next();
}

module.exports = { checkAuth };