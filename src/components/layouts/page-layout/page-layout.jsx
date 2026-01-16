import { Jumbotron, Sidebar } from "../../ui";

function PageLayout ({ children, jumbotron }) {
    
    return (
        <>
            { jumbotron && <Jumbotron {...jumbotron} /> }
            <div className="container-fluid py-2 mx-0">
                <div className="row">
                    <Sidebar />
                    <div className="col-9 col-md-10">
                        { children }
                    </div>
                </div>                
            </div>
        </>
    );
}

export default PageLayout;