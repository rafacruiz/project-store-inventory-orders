import { Link } from "react-router-dom";

function ButtonBack () {
    return (<Link className="btn btn-outline-dark w-100" to={-1}>Back</Link>);
}

export default ButtonBack;