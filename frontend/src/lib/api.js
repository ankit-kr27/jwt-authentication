import API from "../config/apiClient";

export const login = async (data) =>
    await API.post("/auth/login", data);

export const logout = async () =>
    await API.get("/auth/logout");

export const register = async (data) =>
    await API.post("/auth/register", data);

export const verifyEmail = async (verificationCode) =>
    await API.get(`/auth/email/verify/${verificationCode}`, { verificationCode });

export const sendPasswordResetEmail = async (email) =>
    await API.post("/auth/password/forgot", { email });

export const resetPassword = async (data) =>
    await API.post("/auth/password/reset", data);

export const getUser = async () =>
    await API.get("/user");

export const getSessions = async () =>
    await API.get("/sessions");

export const deleteSession = async (id) => API.delete(`/sessions/${id}`);