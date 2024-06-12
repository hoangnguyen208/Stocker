import axios from "axios";
import { CommentGet, CommentPost } from "../Models/Comment";
import { errorHandler } from "../Helpers/ErrorHandler";

const api = 'http://localhost:5033/api/comment/';

export const commentPostApi = async (title: string, content: string, symbol: string) => {
    try {
        const data = await axios.post<CommentPost>(api + `${symbol}`, {
            title,
            content
        });
        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export const commentGetApi = async (symbol: string) => {
    try {
        const data = await axios.get<CommentGet[]>(api + `?symbol=${symbol}`);
        return data;
    } catch (error) {
        errorHandler(error);
    }
}