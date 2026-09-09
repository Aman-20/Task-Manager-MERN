const { User } = require("../model/user");
const { createHashPass, checkHashPass } = require("../service/hashPass");
const { setUser, getUser } = require("../service/jwt");

const {Task} = require("../model/task")

async function handleUserSignup(req, res) {
    try {
        const { name, email, pass } = req.body;

        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.status(409).json({success:false, message:"user already exists"});
        }

        const hash = await createHashPass(pass);
        const result = await User.create({
            name,
            email,
            pass: hash,
        });

        // add some demo tasks for the new user
        await Task.create({ title: "Add a new task", desc: "Click 'Add Task' to create your own.", createdBy: result._id });
        await Task.create({ title: "Delete a task", desc: "Try deleting this one when you're ready.", createdBy: result._id });
        await Task.create({ title: "Welcome!", desc: "This is your first task. Try editing or deleting it.", createdBy: result._id });

        return res.status(201).json({ success: true, message: "user created successfully", result });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "unable to create user" });
    }
}


async function handleUserLogin(req, res) {
    try {
        const { email, pass } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "no user found with this email!" });
        }

        const verifyPass = await checkHashPass(pass, user.pass);
        if (!verifyPass) {
            return res.status(401).json({ success: false, message: "wrong password" });
        }

        const token = setUser(user);
        res.cookie("token", token, {
            maxAge:60*60*1000,
            httpOnly:true,
            secure:true, //for local development use "false"
            sameSite:"none", //for local use "lax"
        });

        return res.status(200).json({ success: true, message: "user verified", token, user });

    } catch (err){
        console.log(err);
        return res.status(401).json({ success: false, message: "user can not be verified"});
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
        return res.status(200).json({ success: true, message: "cookie cleared" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "unbale to delete cookie" });
    }
}


module.exports = { handleUserLogin, handleUserSignup, handleUserLogout };