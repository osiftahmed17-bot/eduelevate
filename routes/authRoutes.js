const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req,res)=>{
    const {name,course,year,password} = req.body;
    const hashed = await bcrypt.hash(password,10);
    const user = new User({name,course,year,password:hashed});
    await user.save();
    res.json({msg:"Registered"});
});

router.post("/login", async (req,res)=>{
    const {name,password} = req.body;
    const user = await User.findOne({name});
    if(!user) return res.status(400).json({msg:"User not found"});

    const valid = await bcrypt.compare(password,user.password);
    if(!valid) return res.status(400).json({msg:"Wrong password"});

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
    res.json({token});
});

module.exports = router;