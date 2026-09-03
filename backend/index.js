const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const {mongoConnect} = require("./connection");

const cors = require("cors");

const app = express();
PORT = process.env.PORT || 3000;

//router
const userRouter = require("./router/user");
const taskRouter = require("./router/task");

mongoConnect(process.env.MONGO_URL);

//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public" )));
app.use(cors());


app.use("/", userRouter);
app.use("/task", taskRouter);


app.listen(PORT, ()=>{
    console.log("express running...")
})