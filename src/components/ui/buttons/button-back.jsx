import { Link } from "react-router-dom";

function ButtonBack ({to = -1}) {
    return (<Link className="btn btn-outline-dark w-100" to={to}>Back</Link>);
}

export default ButtonBack;