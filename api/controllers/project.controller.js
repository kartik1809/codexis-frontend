import Project from "../models/project.model.js";
import { v4 as uuidv4 } from 'uuid';

export const createProject= async (req, res) => {
    const {project_name, project_description,uuid} = req.body;
    const project_id = uuidv4();
    const project_desc=project_description || '';
    if(!project_name) return res.status(400).json({message:'Project name is required'});
    const project = {
        project_id,
        project_name,
        project_description:project_desc,
        html:'',
        css:'',
        js:'',
        last_mod:new Date()
    }
    try {
        const user = await Project.findOne({uuid});
        if(!user) return res.status(404).json({message:'User not found'});
        user.webProjects.push(project);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
    }
}

export const getAllProjects = async (req, res) => {
    const {uuid} = req.body;
    try {
        const user = await Project.findOne({uuid});
        if(!user) return res.status(404).json({message:'User not found'});
        res.status(200).json(user.webProjects);
    } catch (error) {
        console.log(error);
    }
}