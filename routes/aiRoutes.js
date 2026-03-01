const express = require("express");
const axios = require("axios");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req,res)=>{
    try{
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents:[{
                    parts:[{ text:req.body.message }]
                }]
            }
        );

        res.json({
            reply: response.data.candidates[0].content.parts[0].text
        });

    }catch(err){
        res.status(500).json({msg:"AI error"});
    }
});

module.exports = router;