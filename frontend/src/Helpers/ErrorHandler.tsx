import axios from "axios"
import { toast } from "react-toastify";

export const errorHandler = (error: any) => {
    if (axios.isAxiosError(error)) {
        var err = error.response;
        if (Array.isArray(err?.data.errors)) {
            for (const iterator of err?.data.errors) {
                toast.warning(iterator.description);
            }
        } else if (typeof err?.data.errors === 'object') {
            for (const key in err?.data.errors) {
                toast.warning(err?.data.errors[key][0]);
            }
        } else if (err?.data) {
            toast.warning(err.data);
        } else if (err?.status === 401) {
            toast.warning("Please login");
            window.history.pushState({}, "Login Page", "/Login");
        } else if (err) {
            toast.warning(err?.data);
        }
    }
}