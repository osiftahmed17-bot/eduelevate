const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  course: String,
  year: String,
  credits: Number,
  gpa: Number,

  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student"
  },

  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ],

  progress: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
      },
      completedLessons: {
        type: Number,
        default: 0
      }
    }
  ],

  studyPlanner: [
    {
      title: String,
      date: String
    }
  ],

  assignments: [
    {
      title: String,
      dueDate: String,
      status: { type: String, default: "pending" }
    }
  ],

  timetable: [
    {
      time: String,
      subject: String,
      room: String,
      professor: String
    }
  ],

  goals: [
    {
      title: String,
      progress: Number
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);