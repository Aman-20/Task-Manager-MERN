const { Task } = require("../model/task");


async function getUserTask(req, res) {
    try {
        const tasks = await Task.find({createdBy:req.user._id});
        res.json({ success: true, tasks });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}


async function addUserTask(req, res) {
    try {
        const { title, desc } = req.body;
        const taskData = await Task.create({
            title, 
            desc,
            createdBy:req.user._id,
        });
        res.json({ success: true, taskData });
    } catch (err){
        res.json({success:false, message:err.message});
    }
}


async function deleteUserTask(req, res){
    try{
        const taskitem = await Task.findOneAndDelete({_id:req.params.id, createdBy:req.user._id});
        res.json({ success: true, taskitem });
    } catch(err){
        res.json({ success: false, message: err.message })
    }
}


async function getTaskById(req, res) {
    try {
        const taskitem = await Task.findOne({_id:req.params.id, createdBy:req.user._id});
        res.json({ success: true, taskitem });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}


async function updateTaskById(req, res) {
    try {
        const taskitem = await Task.findOneAndUpdate({_id:req.params.id, createdBy:req.user._id}, req.body, { returnDocument: 'after' });
        res.json({ success: true, taskitem });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
}


async function deleteMultipleTask(req, res) {
    try{
        const {ids} = req.body;
        if(!ids || ids.length === 0){
            return res.json({success:false, message:"no id provided"});
        }

        const result = await Task.deleteMany({_id: {$in: ids}, createdBy:req.user._id});
        res.json({success:true, result});

    } catch(err){
        res.json({success:false, message:err.message});
    }
}


module.exports = {getUserTask, addUserTask, deleteUserTask, getTaskById, updateTaskById, deleteMultipleTask};