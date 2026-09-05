const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true});

const Task = mongoose.model("Task", taskSchema);

module.exports = {Task};