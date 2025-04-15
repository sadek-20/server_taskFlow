import dotenv from 'dotenv'

dotenv.config();


export const Mongo_url = process.env.MONGO_URL;
export const jwt_secret = process.env.JWT_sEcret;

// console.log(Mongo_url , 'mongo url')