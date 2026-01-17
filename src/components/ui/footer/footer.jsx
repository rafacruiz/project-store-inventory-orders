
function Footer () {
    
    const year = new Date().getFullYear();

    return (
        <footer className="bg-body-tertiary py-3 mt-auto">
            <div className="container d-flex justify-content-center align-items-center">
                <span className="text-muted mb-0">
                    <small>&copy; { year } ShopManager. Todos los derechos reservados.</small>
                </span>
            </div>
        </footer>
    );
}

export default Footer;