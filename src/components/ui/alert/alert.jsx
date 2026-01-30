
function AlertMessage ({ message, type = "primary" }) {
    return (
        <div className={`alert alert-${type} d-flex justify-content-center align-items-center gap-2`} >
            <i className="fa fa-info-circle"></i>
            <span>{message}</span>
        </div>
    );
};

export default AlertMessage;