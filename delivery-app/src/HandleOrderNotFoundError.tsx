import { isAxiosError } from "axios";
import { useRouteError, Link } from "react-router";
import { Main } from "./components/Main";

export function HandleOrderNotFoundError() {
    const error = useRouteError();

    if (isAxiosError(error) && error.status === 404) {
        const message =
            error.response?.data && typeof error.response.data === "string"
                ? error.response.data
                : "The order you are trying to track does not exist.";
        return (
            <Main fitContent>
                <h1>Order Not Found</h1>
                <p>{message}</p>
                <Link to="/order-history">Go back to Order History</Link>
            </Main>
        );
    }

    console.error(error);

    return (
        <Main fitContent>
            <p>Oops, something went wrong...</p>
            <Link to="/">Back home</Link>
        </Main>
    );
}