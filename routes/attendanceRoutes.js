const express = require("express");
const Attendance = require("../models/attendance");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req,res)=>{
    const data = new Attendance({...req.body,user:req.user._id});
    await data.save();
    res.json(data);
});

router.get("/", auth, async (req,res)=>{
    const data = await Attendance.find({user:req.user._id});
    res.json(data);
});

router.put("/:id", auth, async (req,res)=>{
    const updated = await Attendance.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updated);
});

module.exports = router;