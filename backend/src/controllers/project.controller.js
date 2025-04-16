import Project from '../models/project.model.js';


export const createProject = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required' 
            });
        }

        const newProject = new Project({
            user: req.user.userId,
            title,
            description,
        });

        const savedProject = await newProject.save();

        return res.status(200).json({
            success: true,
            message: 'Project created successfully',
            project: savedProject,
        });
    } catch (error) {
        console.log(error.message)  
        return res.status(400).json({
            success: false, 
            message: 'Error creating Project', 
            error 
        });
    }
};


export const updateProject = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { title, description, status } = req.body;

        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project did not exist' });
        }

        if (project.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to update this task',
            });
        }

        if (title !== undefined) project.title = title;
        if (description !== undefined) project.description = description;
        if (status !== undefined) project.status = status;

        const updatedProject = await project.save();

        return res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            project: updatedProject,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating project',
            error: error.message,
        });
    }
};



export const getAllProject = async (req, res) => {
    try {
        const projects = await Project.find({user: req.user.userId}).populate('user', 'name email');

        if (!projects || projects.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No projects found' 
            });
        }

        return res.status(200).json({
            success: true,
            message: 'All Projects fetched successfully',
            projects,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching projects', error 
        });
    }
};


export const getProjectById = async (req, res) => {
    try {
        const userId = req.user.userId;

        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found' 
            });
        }
        if (project.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to view this Project',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Project fetched successfully',
            project,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching task', error
        });
    }
};


export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'project not found' });
        }
        if (project.user.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this project',
            });
        }

        await project.remove();
       
        return res.status(200).json({
            success: true,
            message: 'Project deleted successfully' 
        });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message: 'Error deleting task', error 
        });
    }
};