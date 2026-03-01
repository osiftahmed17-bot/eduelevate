const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    subject:String,
    totalClasses:Number,
    attendedClasses:Number,
    user:{ type:mongoose.Schema.Types.ObjectId, ref:"User" }
});

module.exports = mongoose.model("Attendance", attendanceSchema);