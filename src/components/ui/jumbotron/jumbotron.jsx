
import jumbo from '../../../assets/img/jumbotron/banner-jumbotron.jpg';

import './jumbotron.css';

function Jumbotron ({ title, subTitle }) {
    return (
        <div className="jumbotron"
            style={{ backgroundImage:` linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
                url(${jumbo})`
            }} >
            <div className='container text-white d-flex flex-column gap-1 p-5'>
                { title && <h2 className="fw-bold mb-0">{ title }</h2> }
                { subTitle && <p className="ms-3 mb-0">{ subTitle }</p> }
            </div>
        </div>
    );
}

export default Jumbotron;