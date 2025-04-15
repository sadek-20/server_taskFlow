import mongoose from "mongoose";
import {  Mongo_url } from "./config.js";

const connectDb = async () => {

    try { 
        await mongoose.connect(Mongo_url);
        console.log('db succefully connected')
} catch(e) {
        console.log(e, 'failed to connect'); 
    }
}

export default connectDb;