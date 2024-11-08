import { CookieOptions, Response } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

const secure = process.env.NODE_ENV !== 'development'

const defaults: CookieOptions = {   // CookieOptions - interface defined by express
    sameSite: "strict",
    httpOnly: true,
    secure
}

const getAccessTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: fifteenMinutesFromNow(),
})

const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: thirtyDaysFromNow(),
    path: "/auth/refresh"   // refresh token will only be sent only on this path, which makes it more secured and less likely to be stolen or tampered
})

type Params = {
    res: Response;
    accessToken: string;
    refreshToken: string;
}

export const setAuthCookies = ({res, accessToken, refreshToken}: Params) => {
    return res
            .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
            .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions())
}