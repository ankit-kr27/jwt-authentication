import catchErrors from "../utils/catchErrors";
import { createAccount, loginUser } from "../services/auth.service";
import { CREATED, OK } from "../constants/http";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";
import { loginSchema, registerSchema } from "./auth.schemas";
import { verifyToken } from "../utils/jwt";
import SessionModel from "../models/session.model";

export const registerHandler = catchErrors(
    async (req, res) => {
        // validate request
        const request = registerSchema.parse({
            ...req.body,
            userAgent: req.headers["user-agent"]
        })

        // call service
        const { user, accessToken, refreshToken } = await createAccount(request);

        // return a response
        return setAuthCookies({res, accessToken, refreshToken})
        .status(CREATED).json(user)
    }
);

export const loginHandler = catchErrors(
    async (req, res) => {
        // validate request
        const request = loginSchema.parse({
            ...req.body, 
            userAgent: req.headers["user-agent"]
        });

        // call service
        const { accessToken, refreshToken, user } = await loginUser(request);

        // return a response
        return setAuthCookies({res, accessToken, refreshToken}).status(OK).json({
            message: "Login successful"
        })
    }
);

export const logoutHandler = catchErrors (
    async (req, res) => {
        const accessToken = req.cookies.accessToken;
        const { payload, } = verifyToken(accessToken)

        if(payload) {
            await SessionModel.findByIdAndDelete(payload.sessionId);
        }

        return clearAuthCookies(res)
        .status(OK)
        .json({
            message: "Logout Successful!"
        })
    }
)