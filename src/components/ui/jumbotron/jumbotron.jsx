import { useAuth } from '../../../contexts';

import jumbo from '../../../assets/img/jumbotron/banner-jumbotron.jpg';

import './jumbotron.css';

const capitalizeFirst = text =>
  text.charAt(0).toUpperCase() + text.slice(1);

function Jumbotron ({ title, subTitle }) {

    const { user } = useAuth();
    
    return (
        <div className="jumbotron"
            style={{ backgroundImage:` linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
                url(${jumbo})`
            }} >
            <div className='container text-white d-flex flex-column gap-1 p-5'>
                { title && <h2 className="fw-bold mb-0">{ title }</h2> }
                { subTitle && 
                    <p className="ms-3 mb-0">
                        { capitalizeFirst(user?.nameShop || user?.role) } <i className="fa fa-angle-right" /> { subTitle }
                    </p> }
            </div>
        </div>
    );
}

export default Jumbotron;