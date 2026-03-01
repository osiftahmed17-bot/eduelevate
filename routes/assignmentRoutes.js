const express = require("express");
const Assignment = require("../models/Assignment");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req,res)=>{
    const assignment = new Assignment({...req.body,user:req.user._id});
    await assignment.save();
    res.json(assignment);
});

router.get("/", auth, async (req,res)=>{
    const data = await Assignment.find({user:req.user._id});
    res.json(data);
});

router.put("/:id", auth, async (req,res)=>{
    const updated = await Assignment.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updated);
});

router.delete("/:id", auth, async (req,res)=>{
    await Assignment.findByIdAndDelete(req.params.id);
    res.json({msg:"Deleted"});
});

module.exports = router;