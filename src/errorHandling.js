import axios from "axios";
import { toast } from "react-toastify";

const handleApiError = (error) => {
    if (axios.isCancel(error)) {
        toast.error("Request timed out");
    } else if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 401) {
            toast.error("Unauthorized: Please log in");
        } else if (statusCode === 404) {
            toast.error("Resource not found");
        } else {
            toast.error(`Server responded with an error: ${statusCode}`);
        }
    } else if (error.request) {
        toast.error("No response received from the server");
    } else {
        toast.error(`An error occurred: ${error.message}`);
    }
};

export default handleApiError;
