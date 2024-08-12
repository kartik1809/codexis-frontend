import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import {Project} from '../models/project.model.js';
import Kanban from '../models/kanban.model.js';

const organiseData=async (user)=>{
    const project ={uuid:user.uuid};
    const kanban ={uuid:user.uuid};
    try{
        await new Project(project).save();
        await new Kanban(kanban).save();
    }
    catch(err){
        console.log("Hello");
    }
}

export const register = async (req, res) => {
    const {first_name, last_name, username, email, password } = req.body;
    const hashedPassword =bcryptjs.hashSync(password, 12);
    const newUser = new User({
        first_name,
        last_name,
        username,
        email,
        password:hashedPassword,
        photoURL:'https://avatars.githubusercontent.com/u/131158199?v=4',
        uuid:uuidv4()
    });
    try{
        await newUser.save();
        organiseData(newUser);
        res.status(201).json(newUser);
    }
    catch(err){
        res.status(409).json({message:err.message});
    }
    
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:'User not found'});
        const isPasswordCorrect = bcryptjs.compareSync(password, user.password);
        if(!isPasswordCorrect) return res.status(400).json({message:'Invalid Credentials'});
        const {password:hashedPassword, ...others} = user._doc;
        const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn:'1d'});
        const expiryDate = new Date(new Date().getTime() + 24*60*60*1000);
        res.cookie('access_token',token,
            {
                httpOnly:true,
                expires:expiryDate
            }
        ).status(200).json({...others})
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}


export const oauth = async (req, res) => {
    const {email, photoURL,name} = req.body;
    try{
        const user = await User.findOne({email});
        if(user){
            const {password, ...others} = user._doc;
            const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn:'1d'});
            const expiryDate = new Date(new Date().getTime() + 24*60*60*1000);
            res.cookie('access_token',token,
                {
                    httpOnly:true,
                    expires:expiryDate
                }
            ).status(200).json({...others})
        }
        else{
            const username = email.split('@')[0]+Math.floor(Math.random()*10000)+new Date().getTime();
            const password = email.split('@')[0]+new Date().getFullYear()+name.split(' ')[0];
            const hashedPassword = bcryptjs.hashSync(password, 12);
            const newUser = new User({
                first_name:name.split(' ')[0],
                last_name:name.split(' ')[1],
                username,
                email,
                password:hashedPassword,
                photoURL:photoURL,
                uuid:uuidv4()
            });
            await newUser.save();
            organiseData(newUser);
            const added_user = await User.findOne({email});
            const {password:exportPassword, ...others} = added_user._doc;
            const token = jwt.sign({id:added_user._id}, process.env.SECRET_KEY, {expiresIn:'1d'});
            const expiryDate = new Date(new Date().getTime() + 24*60*60*1000);
            res.cookie('access_token',token,
                {
                    httpOnly:true,
                    expires:expiryDate
                }
            ).status(201).json({...others})
        }
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}