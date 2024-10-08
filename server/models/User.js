import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    password:{
        type:String,
        required: true,
        trim:true
    },

    role:{type: String, enum: ['admin','user','guest'], default:'user'},

    resetPasswordToken: String,
    resetPasswordExpires: Date
});


const UserModel = mongoose.model('productmanageusers',userSchema);

export default UserModel;