"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const env_1 = require("./constants/env");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const catchErrors_1 = __importDefault(require("./utils/catchErrors"));
const http_1 = require("./constants/http");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const authenticate_1 = __importDefault(require("./middleware/authenticate"));
const user_routes_1 = require("./routes/user.routes");
const session_route_1 = __importDefault(require("./routes/session.route"));
const corsConfig = {
    "allowedOrigins": ["http://localhost:5173", "jwt-authentication-ch7k7pcv8-ankitkr27s-projects.vercel.app", "jwt-authentication-xi-ten.vercel.app"],
    "allowCredentials": true,
    "allowedMethods": ["GET", "POST"],
    "allowedHeaders": ["Content-Type", "Authorization"]
};
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || corsConfig.allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: corsConfig.allowCredentials,
    methods: corsConfig.allowedMethods.join(','),
    allowedHeaders: corsConfig.allowedHeaders.join(',')
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
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
app.get("/health", (0, catchErrors_1.default)(async (req, res, next) => {
    return res.status(http_1.OK).json({
        status: "Healthy"
    });
}));
// auth routes
app.use("/auth", auth_route_1.default);
// protected routes
app.use("/user", authenticate_1.default, user_routes_1.userRoutes);
app.use("/sessions", authenticate_1.default, session_route_1.default);
app.use(errorHandler_1.default); // The error handler middleware is put after the routes as any error gets caught in the controllers it is passed to that middleware via "next"
app.listen(env_1.PORT, async () => {
    console.log(`Server is running on port ${env_1.PORT} in the ${env_1.NODE_ENV} environment.`);
    await (0, db_1.default)();
});
