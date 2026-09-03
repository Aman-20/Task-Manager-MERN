const mongoose = require("mongoose");


const mongoConnect = async(URL) => {
    mongoose.connect(URL, {dbName:"task"})
    .then(()=>console.log("mongodb Connected.."))
    .catch((err)=>{console.log("err: ", err)});
}


module.exports = {mongoConnect};
