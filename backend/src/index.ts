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
import authenticate from "./middleware/authenticate";
import { userRoutes } from "./routes/user.routes";
import sessionRoutes from "./routes/session.route";

const corsConfig = {
    "allowedOrigins": ["http://localhost:5173", "jwt-authentication-ch7k7pcv8-ankitkr27s-projects.vercel.app", "jwt-authentication-xi-ten.vercel.app"],
    "allowCredentials": true,
    "allowedMethods": ["GET", "POST"],
    "allowedHeaders": ["Content-Type", "Authorization"]
}

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || corsConfig.allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: corsConfig.allowCredentials,
    methods: corsConfig.allowedMethods.join(','),
    allowedHeaders: corsConfig.allowedHeaders.join(',') 
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));
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

// auth routes
app.use("/auth", authRoutes);

// protected routes
app.use("/user", authenticate, userRoutes)
app.use("/sessions", authenticate, sessionRoutes)

app.use(errorHandler)   // The error handler middleware is put after the routes as any error gets caught in the controllers it is passed to that middleware via "next"

app.listen(
    PORT,
    async () => {
        console.log(`Server is running on port ${PORT} in the ${NODE_ENV} environment.`)
        await connnectToDatabase();
    }
)