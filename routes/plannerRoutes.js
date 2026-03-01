const express = require("express");
const Planner = require("../models/planner");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req,res)=>{
    const task = new Planner({...req.body,user:req.user._id});
    await task.save();
    res.json(task);
});

router.get("/", auth, async (req,res)=>{
    const tasks = await Planner.find({user:req.user._id});
    res.json(tasks);
});

router.put("/:id", auth, async (req,res)=>{
    const updated = await Planner.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updated);
});

router.delete("/:id", auth, async (req,res)=>{
    await Planner.findByIdAndDelete(req.params.id);
    res.json({msg:"Deleted"});
});

module.exports = router;