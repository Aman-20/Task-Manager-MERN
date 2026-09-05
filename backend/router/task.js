const express = require("express");
const { Task } = require("../model/task");

const {getUserTask, addUserTask, deleteUserTask, getTaskById, updateTaskById, deleteMultipleTask} = require("../controller/task");

const router = express.Router();


router.get("/", getUserTask);


router.post("/add", addUserTask);


router.delete("/delete/:id", deleteUserTask);


router.get("/:id", getTaskById);


router.put("/update/:id", updateTaskById);


router.delete("/delete-multiple", deleteMultipleTask);


module.exports = router;