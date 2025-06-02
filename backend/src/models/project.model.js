import mongoose from "mongoose";
import Task from "./task.model.js";

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      capitalize: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    status: {
      type: String,
      enum: ["completed", "not completed"],
      default: "not completed",
    },
    dueDate: {
      type: Date,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.pre("remove", async function(next) {
  await Task.deleteMany({_id: {$in: this.tasks}});
  next();
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
