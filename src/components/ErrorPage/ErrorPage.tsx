import axios from 'axios';
import { AxiosError } from "axios";

interface IProps {
    error: AxiosError | Error | null;
}

const ErrorPage: React.FC<IProps> = ({ error }) => {
    let statusCode: number | undefined;
    let errorMessage: string | undefined;
    if (axios.isAxiosError(error)) {
        statusCode = error.response?.status;
        errorMessage = error.response?.data.msg;

        // if for any reason, statusCode or errorMessage are not found in response
        if (statusCode === undefined) {
            errorMessage = "No status code was returned"
        } else if (statusCode !== undefined && errorMessage === undefined) {
            errorMessage = `Only a status code was returned: ${statusCode}`;
        } else if (statusCode === undefined && errorMessage === undefined) {
            errorMessage = `No status code or error message were returned `
        }
    }
    return (
        <h1>{errorMessage}</h1>
    )
}

    export default ErrorPage