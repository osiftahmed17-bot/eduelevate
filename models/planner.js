const mongoose = require("mongoose");

const plannerSchema = new mongoose.Schema({
    task:String,
    date:Date,
    completed:{ type:Boolean, default:false },
    user:{ type:mongoose.Schema.Types.ObjectId, ref:"User" }
});

module.exports = mongoose.model("Planner", plannerSchema);