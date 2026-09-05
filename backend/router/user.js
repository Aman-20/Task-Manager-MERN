const express = require("express");
const router = express.Router();

const {handleUserLogin, handleUserSignup, handleUserLogout} = require("../controller/user");
const {checkAuth} = require("../middleware/checkAuth");


router.get("/me", checkAuth, (req, res) => {
    res.json({success:true, user:req.user});
});

router.post("/signup", handleUserSignup);

router.post("/login", handleUserLogin);

router.get("/logout", checkAuth, handleUserLogout);


module.exports = router;