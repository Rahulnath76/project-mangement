import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    capitalize: true,
  },
  status: {
    type: String,
    enum: ["pending", "inprogress", "completed"],
    default: "pending",
  },
}, {timestamps: true});

const Task = mongoose.model("Task", taskSchema);

export default Task;
