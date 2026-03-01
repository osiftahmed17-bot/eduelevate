const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
    title:String,
    description:String,
    dueDate:Date,
    user:{ type:mongoose.Schema.Types.ObjectId, ref:"User" }
});

module.exports = mongoose.model("Assignment", assignmentSchema);