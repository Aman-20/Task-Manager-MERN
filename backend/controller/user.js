const { User } = require("../model/user");
const { createHashPass, checkHashPass } = require("../service/hashPass");
const { setUser, getUser } = require("../service/jwt");


async function handleUserSignup(req, res) {
    try {
        const { name, email, pass } = req.body;

        const hash = await createHashPass(pass);
        const result = await User.create({
            name,
            email,
            pass: hash,
        });

        res.json({ success: true, message: "user created successfully!", result });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}


async function handleUserLogin(req, res) {
    try {
        const { email, pass } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "no user found with this email!" });
        }

        const verifyPass = await checkHashPass(pass, user.pass);
        if (!verifyPass) {
            return res.json({ success: false, message: "wrong password" });
        }

        const token = setUser(user);
        res.cookie("token", token, {
            maxAge:60*60*1000,
            httpOnly:true,
            secure:true, //for local development use "false"
            sameSite:"none", //for local use "lax"
        });

        res.json({ success: true, message: "user verified", token, user });

    } catch{
        res.json({ success: false, message: "user can not be verified", err:err.message });
    }
}


async function handleUserLogout(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/", // must match the path used in res.cookie, default is "/"
        });
        res.json({ success: true, message: "cookie cleared" });
    } catch (err) {
        res.json({ success: false, message: "unbale to delete cookie", err: err.message });
    }
}


module.exports = { handleUserLogin, handleUserSignup, handleUserLogout };