
import { BounceLoader } from "react-spinners";

function Loader ({ size = 35, color = "#030404" }) {
    return (
    <div className="d-flex justify-content-center align-items-center py-4">
        <BounceLoader color={color} size={size} />
    </div>);
};

export default Loader;