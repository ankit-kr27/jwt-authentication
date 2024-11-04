import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import { CONFLICT } from "../constants/http";
import VerificationCodeType from "../constants/verificationCodeType";
import SessionModel from "../models/session.model";
import UserModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import appAssert from "../utils/appAsserts";
import { oneYearFromNow } from "../utils/date";
import jwt from "jsonwebtoken";

export type CreateAccountParams = {
    email: string;
    password: string;
    userAgent?: string;
}

export const createAccount = async (data: CreateAccountParams) => {
    // verify existing user doesn't exist
    const existingUser = await UserModel.exists({email: data.email});

    // if(existingUser) throw new Error("User already exists");
    appAssert(!existingUser, CONFLICT, "Email already in use");

    // create user
    const user = await UserModel.create({
        email: data.email,
        password: data.password,
    })

    // create verification code 
    const verificationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: VerificationCodeType.EmailVerification,
        expiresAt: oneYearFromNow(),
    });

    // send verification email

    // create session
        // A session is gonna represent the unit of time the user is gonna logged in for
    const session = await SessionModel.create({
        userId: user._id,
        userAgent: data.userAgent
    })
    
    // sign access token and refresh token
    const refreshToken = jwt.sign(
        {
            sessionId: session._id 
        },
        JWT_REFRESH_SECRET,
        { 
            audience: ['user'],     // for whom the token is created, e.g. user, admin, etc.
            expiresIn: "30d" 
        }
    );

    const accessToken = jwt.sign(
        { 
            userId: user._id,
            sessionId: session._id 
        },
        JWT_SECRET,
        { 
            audience: ['user'],     // for whom the token is created, e.g. user, admin, etc.
            expiresIn: "15m" 
        }
    );

    // return user and tokens
    return {
        user,
        refreshToken, 
        accessToken,
    }
}