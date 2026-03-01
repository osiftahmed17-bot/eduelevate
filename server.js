require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/auth", require("./routes/authRoutes"));
app.use("/assignments", require("./routes/assignmentRoutes"));
app.use("/courses", require("./routes/courseRoutes"));
app.use("/attendance", require("./routes/attendanceRoutes"));
app.use("/planner", require("./routes/plannerRoutes"));
app.use("/ai", require("./routes/aiRoutes"));

app.get("/profile", require("./middleware/authMiddleware"), async (req,res)=>{
    res.json(req.user);
});

app.listen(process.env.PORT, ()=>console.log("Server running on port 5000"));