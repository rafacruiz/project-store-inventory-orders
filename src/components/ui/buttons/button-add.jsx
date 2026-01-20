import { Link } from "react-router-dom";

function ButtonAdd ({ buttonOption }) {

    const tooltipAddList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const toolList = [...tooltipAddList].map(
        tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl)
    )

    return (<>
            <Link 
                className={`btn btn-outline-${ buttonOption.mode}`}
                data-bs-toggle="tooltip"
                data-bs-placement={ buttonOption.placement }
                title={ buttonOption.title }
                to={ buttonOption.to }>
                <i className="fa fa-plus"></i>
            </Link>
        </>);
}

export default ButtonAdd;