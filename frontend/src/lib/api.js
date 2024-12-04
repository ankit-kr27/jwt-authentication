import API from "../config/apiClient";

export const login = async (data) =>
    await API.post("/auth/login", data);

export const register = async (data) =>
    await API.post("/auth/register", data);

export const verifyEmail = async (verificationCode) =>
    await API.get(`/auth/email/verify/${verificationCode}`, { verificationCode });

export const sendPasswordResetEmail = async (email) =>
    await API.post("/auth/password/forgot", { email });