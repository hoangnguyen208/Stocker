import axios from "axios";
import { errorHandler } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/UserProfileToken";

const api = "http://localhost:5033/api/";

export const loginApi = async (username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/login", {
            userName: username,
            password: password
        });
        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export const registerApi = async (email: string, username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/register", {
            userName: username,
            password: password,
            email: email
        });
        return data;
    } catch (error) {
        errorHandler(error);
    }
}