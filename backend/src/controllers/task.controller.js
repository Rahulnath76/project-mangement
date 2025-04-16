import Task from "../models/task.model.js";
import Project from "../models/project.model.js";

export const createTask = async (req, res) => {
  try {
    const { name, description, projectId } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project does not exist",
      });
    }

    if(project.user.toString() !== req.user.userId.toString()){
      return res.status(400).json({
        message: "You are not authorized"
      })
    }

    const task = await Task.create({
      name,
      description,
    });

    if (!task) {
      return res.status(401).json({
        message: "Error in creating task",
      });
    }

    project.tasks.push(task._id);

    await project.save();

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      success: false,
      message: "Error creating task",
      error,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { name, description, status, projectId, taskId } = req.body;

    const project = await Project.findById({ _id: projectId });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project does not exist",
      });
    }

    if(project.user.toString() !== req.user.userId){
      return res.status(400).json({
        message: "You are not authorized"
      })
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task did not exist" });
    }

    if(!project.tasks.includes(taskId)){
      return res.status(404).json({ message: "Task did not belong to this project" });
    }

    if (name !== undefined) task.name = name;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    const updatedTask = await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating task",
      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;

    const project = await Project.findById({ _id: projectId });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project does not exist",
      });
    }

    if(project.user.toString() !== req.user.userId){
      return res.status(400).json({
        message: "You are not authorized"
      })
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task did not exist" });
    }

    if(!project.tasks.includes(taskId)){
      return res.status(404).json({ message: "Task did not belong to this project" });
    }

    await task.deleteOne();

    project.tasks.pull(taskId);
    await project.save();

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating task",
      error: error.message,
    });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project does not exist",
      });
    }
    
    if(project._id.toString() !== req.user.userId){
      return res.status(400).json({
        message: "You are not authorized to access this project"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      tasks: project.tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating task",
      error: error.message,
    });
  }
};
