const express = require("express");
const { Task } = require("../model/task");

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json({ success: true, tasks });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});


router.post("/add", async (req, res) => {
    try {
        const { title, desc } = req.body;
        const taskData = await Task.create({
            title, desc
        });
        res.json({ success: true, taskData });
    } catch (err){
        res.json({success:false, message:err.message});
    }
});


router.delete("/delete/:id", async (req, res) => {
    try{
        const taskitem = await Task.findByIdAndDelete(req.params.id);
        res.json({ success: true, taskitem });
    } catch(err){
        res.json({ success: false, message: err.message })
    }
});


router.get("/:id", async (req, res) => {
    try {
        const taskitem = await Task.findById(req.params.id);
        res.json({ success: true, taskitem });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});


router.put("/update/:id", async (req, res) => {
    try {
        const taskitem = await Task.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
        res.json({ success: true, taskitem });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});


router.delete("/delete-multiple", async(req, res)=>{
    try{
        const {ids} = req.body;
        if(!ids || ids.lenght === 0){
            return res.json({success:false, message:"no id provided"});
        }

        const result = await Task.deleteMany({_id: {$in: ids}});
        res.json({success:true, result});

    } catch(err){
        res.json({success:false, message:err.message});
    }
});


module.exports = router;