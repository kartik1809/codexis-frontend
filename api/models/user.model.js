import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    uuid:{
        type:String,
        required:true
    },
    last_name:{
        type:String
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    photoURL:{
        type:String
    }
},{timestamps:true})

const User=mongoose.model('User',userSchema);

export default User;