const { Task } = require("../model/task");


async function getUserTask(req, res) {
    try {
        const tasks = await Task.find({createdBy:req.user._id});
        return res.status(200).json({ success: true, message:"Task List fetched successfully!", tasks });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: "unable to get Task List from mongoDB" });
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
        return res.status(201).json({ success: true, message:"Task Created Successfully!", taskData });

    } catch (err){
        console.log(err);
        return res.status(400).json({success:false, message:"Unable to create task!"});
    }
}


async function deleteUserTask(req, res){
    try{
        await Task.findOneAndDelete({_id:req.params.id, createdBy:req.user._id});
        return res.status(200).json({ success: true, message:"Task deleted successfully!" });

    } catch(err){
        console.log(err);
        return res.status(404).json({ success: false, message: "Task not deleted" });
    }
}


async function getTaskById(req, res) {
    try {
        const taskitem = await Task.findOne({_id:req.params.id, createdBy:req.user._id});
        return res.status(200).json({ success: true, message:"Selected Task fetched successfully", taskitem });

    } catch (err) {
        console.log(err);
        return res.status(404).json({ success: false, message: "unable to fetch selected task" });
    }
}


async function updateTaskById(req, res) {
    try {
        const taskitem = await Task.findOneAndUpdate({_id:req.params.id, createdBy:req.user._id}, req.body, { returnDocument: 'after' });
        return res.status(200).json({ success: true, message:"Task Updated Successfully" ,taskitem });
        
    } catch (err) {
        console.log(err);
        return res.status(404).json({ success: false, message: "Unable to Update Task" });
    }
}


async function deleteMultipleTask(req, res) {
    try{
        const {ids} = req.body;
        if(!ids || ids.length === 0){
            return res.status(400).json({success:false, message:"no task id provided"});
        }

        await Task.deleteMany({_id: {$in: ids}, createdBy:req.user._id});
        return res.status(200).json({success:true, message:"selected task is deleted"});

    } catch(err){
        console.log(err);
        return res.status(400).json({success:false, message:"unable to delete selected task"});
    }
}


module.exports = {getUserTask, addUserTask, deleteUserTask, getTaskById, updateTaskById, deleteMultipleTask};