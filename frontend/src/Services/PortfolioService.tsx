import axios from "axios";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";
import { errorHandler } from "../Helpers/ErrorHandler";

const api = "http://localhost:5033/api/portfolio/";

export const portfolioAddApi = async (symbol: string) => {
    try {
        const data = await axios.post<PortfolioPost>(api + `?symbol=${symbol}`);
        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export const portfolioDeleteApi = async (symbol: string) => {
    try {
        const data = await axios.delete<PortfolioPost>(api + `?symbol=${symbol}`);
        return data;
    } catch (error) {
        errorHandler(error);
    }
}

export const portfolioGetApi = async () => {
    try {
        const data = await axios.get<PortfolioGet[]>(api);
        return data;
    } catch (error) {
        errorHandler(error);
    }
}