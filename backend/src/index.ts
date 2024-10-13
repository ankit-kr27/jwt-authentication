import "dotenv/config"
import express from "express"
import connnectToDatabase from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: APP_ORIGIN,
    credentials: true,
}))
app.use(cookieParser());

// app.get("/health", async (req, res, next) => {    
// // when we make the function async it is supposed to return a promise and when an error is thrown, it becomes a promise rejection. It needs to handled separately in the below manner.
//     try {
//         throw new Error("This is a test error");
//         return res.status(200).json({
//             status: "Healthy"
//         });
//     } catch (error) {
//         next(error);    // This prohibits the promise to be rejected and handles it by sending the request to the middleware.
//     }
// });

app.get("/health", 
    catchErrors(async (req, res, next) => {
        return res.status(OK).json({
            status: "Healthy"
        });
    })
);

app.use("/auth", authRoutes);

app.use(errorHandler)

app.listen(
    PORT,
    async () => {
        console.log(`Server is running on port ${PORT} in the ${NODE_ENV} environment.`)
        await connnectToDatabase();
    }
)