import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function ButtonAdd ({ buttonOption }) {

    const ref = useRef(null);

    useEffect(() => {
        const tooltipTriggerEl = new bootstrap.Tooltip(ref.current);

        return () => {
            tooltipTriggerEl.dispose();
        }
    }, []);

    return (
        <>
            <Link 
                ref={ ref }
                className={ `btn btn-outline-${ buttonOption.mode}` }
                data-bs-toggle="tooltip"
                data-bs-placement={ buttonOption.placement }
                title={ buttonOption.title }
                to={ buttonOption.to }>
                <i className="fa fa-plus"></i>
            </Link>
        </>);
}

export default ButtonAdd;