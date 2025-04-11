import Task from '../models/task.model.js';


export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        console.log(req.user.userId);
        const newTask = new Task({
            user: req.user.userId,
            title,
            description,
        });

        const savedTask = await newTask.save();

        return res.status(200).json({
            success: true,
            message: 'Task created successfully',
            task: savedTask,
        });
    } catch (error) {
        console.log(error.message)  
        return res.status(400).json({
            success: false, 
            message: 'Error creating task', 
            error 
        });
    }
};


export const updateTask = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { title, description, status } = req.body;

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to update this task',
            });
        }

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (status !== undefined) task.status = status;

        const updatedTask = await task.save();

        return res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            task: updatedTask,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating task',
            error: error.message,
        });
    }
};



export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({user: req.user.userId}).populate('user', 'name email');

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No tasks found' 
            });
        }

        return res.status(200).json({
            success: true,
            message: 'All Tasks fetched successfully',
            tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching tasks', error 
        });
    }
};


export const getTaskById = async (req, res) => {
    try {
        const userId = req.user.userId;

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found' 
            });
        }
        if (task.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to view this task',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Task fetched successfully',
            task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching task', error
        });
    }
};


export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.user.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this task',
            });
        }

        await task.deleteOne();
       
        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully' 
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: 'Error deleting task', error 
        });
    }
};