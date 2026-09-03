const express = require("express");
const {User} = require("../model/user");

const router = express.Router();

router.get("/",(req, res)=>{
    res.send("this is user router");
});



module.exports = router;