import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const { Schema } = mongoose;

const userSchema = Schema({
    name: {
        type: String,
        required: true,
        lowercase:true
    },
    email: {
        type: String,
        required: true,
        lowercase:true
    },
    password: {
        type: String,
        required: true,
        select: false,
        lowercase:true
    }
}, {
    timestamp : true
})



export const User = mongoose.model('User', userSchema);



