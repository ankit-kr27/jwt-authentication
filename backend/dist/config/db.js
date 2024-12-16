"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../constants/env");
const db_1 = require("../constants/db");
const connnectToDatabase = async () => {
    try {
        const connectionInstance = await mongoose_1.default.connect(`${env_1.MONGO_URI}/${db_1.DB_NAME}`);
        console.log("Connected to database successfully: ", connectionInstance.connection.host);
    }
    catch (error) {
        console.log("Could not connect to database. ", error);
        process.exit(1);
    }
};
exports.default = connnectToDatabase;
