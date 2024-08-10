import Kanban from "../models/kanban.model.js";
import { v4 as uuidv4 } from 'uuid';

export const updateKanban = async (req, res) => {
    const {uuid, board} = req.body;
    try {
        const user = await Kanban.findOne({uuid});
        if(!user) return res.status(404).json({message:'User not found'});
        user.kanbanBoards = board;
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        console.log(error);
    }
}

export const getKanban = async (req, res) => {
    const {uuid} = req.body;
    try {
        const user = await Kanban.findOne({uuid});
        if(!user) return res.status(404).json({message:'User not found'});
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
    }
}

export const addTask = async (req, res) => {
    const {uuid,idx,task} = req.body;
    try {
        const user = await Kanban.findOne({uuid});
        if(!user) return res.status(404).json({message:'User not found'});
        user.kanbanBoards[idx].tasks.push(task);
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        console.log(error);
    }
}

export const deleteTask = async (req, res) =>{
    const {uuid,idx,taskIdx} = req.body;
    try {
        const user = await Kanban.findOne({uuid});
        if(!user) return res.status(404).json({message:'User not found'});
        user.kanbanBoards[idx].tasks.splice(taskIdx, 1);
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        console.log(error);
    }
}

export const updateTask = async (req, res) => {
    const {uuid,idx,taskIdx,task} = req.body;
    try {
        const user = await Kanban.findOne({uuid});
        if(!user) return res.status(404).json({message:'User not found'});
        user.kanbanBoards[idx].tasks[taskIdx] = task;
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        console.log(error);
    }
}