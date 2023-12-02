import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigation.css';
import { Link } from 'react-router-dom';
function Navigation(props) {
    return ( 
            <nav className="navbar navbar-expand-lg navbar-light nav-bg">
                <div className='navWrapper'>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <span className="navbar-brand">MultiKina</span>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className={`nav-item ${props.active === "home" ? 'activeHover' : ''}`}>
                        <Link to ="/" className='nav-link'>Strona Główna</Link>
                    </li>
                    <li className={`nav-item ${props.active === "promotions" ? 'activeHover' : ''}`}>
                        <Link to ="/promocje" className='nav-link'>Promocje</Link>
                    </li>
                    <li className={`nav-item ${props.active === "news" ? 'activeHover' : ''}`}>
                        <Link to ="/aktualnosci" className='nav-link'>Aktualności</Link>
                    </li>
                                                {/* bedzie zaznaczac aktywna strone w css */}
                    <li className={`nav-item ${props.active === "about" ? 'activeHover' : ''}`}>
                        <Link to ="/o-nas" className='nav-link'>O nas</Link>
                    </li>
                    </ul>
                    <div className='logInButtons'>
                        <Link to="/login" className="btn btn-outline-success my-2 my-sm-0">Zaloguj się</Link>
                        <Link to="/rejestracja" className="btn my-2 my-sm-0">Zarejestruj się</Link>
                    </div>

                </div>
                </div>
            </nav>
     );
}

export default Navigation;