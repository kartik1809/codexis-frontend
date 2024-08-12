import { Project, Item } from "../models/project.model.js";
import { v4 as uuidv4 } from 'uuid';

export const createProject = async (req, res) => {
    const { project_name, project_description, uuid } = req.body;
    const project_id = uuidv4();
    const project_desc = project_description || '';
    if (!project_name) return res.status(400).json({ message: 'Project name is required' });
    const project = {
        project_id,
        project_name,
        project_description: project_desc,
        html: '',
        css: '',
        js: '',
        last_mod: new Date()
    }
    try {
        const user = await Project.findOne({ uuid });
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.webProjects.push(project);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
    }
}

export const getAllProjects = async (req, res) => {
    const { uuid } = req.body;
    try {
        const user = await Project.findOne({ uuid });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user.webProjects);
    } catch (error) {
        console.log(error);
    }
}

export const getProject = async (req, res) => {
    const { uuid, project_id } = req.body;
    try {
        const user = await Project.findOne({ uuid });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const project = user.webProjects.find(project => project.project_id === project_id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(project);
    } catch (error) {
        console.log(error);
    }
}


// Working on folders

export const newFolder = async (req, res) => {
    const { folder_name, folder_description, uuid } = req.body;
    const folder_id = uuidv4();
    const folder_desc = folder_description || '';
    if (!folder_name) return res.status(400).json({ message: 'Folder name is required' });
    const folder = {
        folder_id,
        folder_name,
        folder_description: folder_desc,
        items: [],
        last_mod: new Date()
    }
    try {
        const user = await Project.findOne({ uuid });
        if (!user) return res.status(404).json({ message: 'User not found' });
        user.folders.push(folder);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
    }
}

const populateItems = async (items) => {
    for (let item of items) {
        if (item.items && item.items.length > 0) {
            const populatedItem = await Item.findById(item._id)
                .populate('items')
                .exec();
                
            item.items = populatedItem.items;

            await populateItems(item.items);
        }
    }
};

export const getFolder = async (req, res) => {
    const { uuid, folder_id } = req.body;
    try {
        const project = await Project.findOne({ uuid })
            .populate({
                path: 'folders.items',
                model: 'Item'
            })
            .exec();

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const folder = project.folders.find(f => f.folder_id === folder_id);

        if (!folder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        await populateItems(folder.items);

        res.status(200).json(folder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const checkInternalFolders = async (req,res,item,uuid,folder_id,item_id) => {
    try{
        const parent=await Item.findOne({id:folder_id});
        if(!item) return res.status(404).json({message:'Folder not found'});
        const newItem = new Item({
            id: item_id,
            label: item.label,
            isFolder: item.isFolder,
            url: item.url,
            items: []
        });
        await newItem.save();
        parent.items.push(newItem._id);
        await parent.save();
        res.status(201).json(newItem);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:'Server error'});
    }
}


export const createItem = async (req, res) => {
    const { uuid, folder_id, item } = req.body;
    const item_id = uuidv4();
    try {
        const project = await Project.findOne({ uuid });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const folder = project.folders.find(f => f.folder_id === folder_id);

        if (!folder) {
            checkInternalFolders(req,res,item,uuid,folder_id,item_id);
            return;
        }
        const newItem = new Item({
            id: item_id,
            label: item.label,
            isFolder: item.isFolder,
            url: item.url,
            items: []
        });
        await newItem.save();

        folder.items.push(newItem._id);
        await project.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getItem = async (req,res)=>{
    const {uuid, item_id}=req.body;
    try{
        const item=await Item.findOne({id:item_id});
        if(!item) return res.status(404).json({message:'Item not found'});
        res.status(200).json(item);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:'Server error'});
    }
}

export const renameItem = async (req,res) =>{
    const {item_id, new_name}=req.body;
    try{
        const item=await Item.findOne({id:item_id});
        if(!item) return res.status(404).json({message:'Item not found'});
        item.label=new_name;
        await item.save();
        res.status(200).json(item);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:'Server error'});
    }
}



export const deleteItem = async (req, res) => {
    const { item_id } = req.body;
    try {
        const item = await Item.findOne({ id: item_id });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        await Item.deleteOne({ id: item_id });
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};








