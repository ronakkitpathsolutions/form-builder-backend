import mongoose from "mongoose";
import dotenv from 'dotenv';

const options = {
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10*1000, // 1s timeout
};

class database {
    constructor(){
        dotenv.config()
    }

    connection = () => {
        return new Promise((resolve, reject) => {
            const db = mongoose.connect(process.env.MONGO_CONNECT, options)
            resolve(db)
        })
    }
}

export default new database()