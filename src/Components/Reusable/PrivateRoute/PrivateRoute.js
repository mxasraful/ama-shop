import { Route } from "react-router";
import { useStateValue } from "../../StateProvider/StateProvider";

function PrivateRoute({ children, ...rest }) {

    const [{ user },] = useStateValue()

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                    window.location.replace(`/login?for=${rest.location.pathname}`)
                )
            }
        />
    );
}
export default PrivateRoute;