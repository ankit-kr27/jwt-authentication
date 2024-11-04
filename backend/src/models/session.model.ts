import mongoose from "mongoose";
import { thirtyDaysFromNow } from "../utils/date";

export interface SessionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    userAgent?: string;     // helps identify which device the user has logged in with, and will let them know if they're the one who accessed it or someone else.
    createdAt: Date;
    expiresAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>({
    userId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        index: true,
    },
    userAgent: { type: String },
    createdAt: {type: Date, required: true, default: Date.now },
    expiresAt: {    // anytime a session document is inserted into the db it will get a default expiration date of thirty days from current date
        type: Date,
        default: thirtyDaysFromNow
    }
});

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);
export default SessionModel;