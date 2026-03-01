const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

/* AUTH MIDDLEWARE */
function auth(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
}

/* CREATE COURSE (ADMIN ONLY LATER) */
router.post("/create", async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.json(newCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET ALL COURSES */
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

/* ENROLL */
router.post("/enroll/:courseId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const course = await Course.findById(req.params.courseId);

    if (!user || !course)
      return res.status(404).json({ message: "User or Course not found" });

    if (!user.enrolledCourses.includes(course._id)) {
      user.enrolledCourses.push(course._id);
      course.studentsEnrolled.push(user._id);

      await user.save();
      await course.save();
    }

    res.json({ message: "Enrolled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Enrollment failed" });
  }
});

/* GET MY COURSES */
router.get("/my", auth, async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate("enrolledCourses");

  res.json(user.enrolledCourses);
});

module.exports = router;