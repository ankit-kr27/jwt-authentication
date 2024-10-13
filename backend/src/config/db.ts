import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

const connnectToDatabase = async () => {
    try {
        const connectionInstance = await mongoose.connect(MONGO_URI); 
        console.log("Connected to database successfully: ", connectionInstance.connection.host) 
    } catch (error) {
        console.log("Could not connect to database. ", error);
        process.exit(1);
    }
};

export default connnectToDatabase;