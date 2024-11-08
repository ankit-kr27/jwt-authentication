import catchErrors from "../utils/catchErrors";
import { createAccount, loginUser } from "../services/auth.service";
import { CREATED, OK } from "../constants/http";
import { setAuthCookies } from "../utils/cookies";
import { loginSchema, registerSchema } from "./auth.schemas";

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