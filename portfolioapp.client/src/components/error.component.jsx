import { useRouteError } from "react-router-dom";

export default function ErrorComponent() {
    var error = useRouteError();
    console.log(error);
    return <h2>There was an error :(</h2>
}