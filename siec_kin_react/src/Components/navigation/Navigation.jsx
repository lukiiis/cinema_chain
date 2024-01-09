import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigation.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Navigation(props) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light nav-bg">
            <div className='navWrapper'>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link to ="/"><span className="navbar-company">MultiKina</span></Link>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0 navColor">
                        <li className={`nav-item ${props.active === "home" ? 'activeHover' : ''}`}>
                            <Link to="/" className={`navColor ${props.active === "home" ? 'activeHover' : ''}`}>Strona Główna</Link>
                        </li>
                        <li className={`nav-item ${props.active === "promotions" ? 'activeHover' : ''}`}>
                            <Link to="/promocje" className={`navColor ${props.active === "promotions" ? 'activeHover' : ''}`}>Promocje</Link>
                        </li>
                        <li className={`nav-item ${props.active === "news" ? 'activeHover' : ''}`}>
                            <Link to="/aktualnosci" className={`navColor ${props.active === "news" ? 'activeHover' : ''}`}>Aktualności</Link>
                        </li>
                        {/* bedzie zaznaczac aktywna strone w css */}
                        <li className='nav-item'>
                            <Link to="/o-nas" className={`navColor ${props.active === "about" ? 'activeHover' : ''}`}>O nas</Link>
                        </li>
                    </ul>
                    {/* info o uzytkowniku jeśli jest zalogowany*/}
                    {localStorage.getItem('token') ?
                        <div className='userInfoMenu'>
                            {(()=>{
                                if(localStorage.getItem('role') === "ADMIN"){
                                    return (
                                        <Link to="/admin-dashboard" className='dashboardLink'>
                                            <img src='http://localhost:3000/static/media/user-gear.3f58436e0da6510255f1.png'></img>
                                        </Link>
                                    )
                                }
                                else if(localStorage.getItem('role') === "USER"){
                                    return (
                                        <Link to="/dashboard" className='dashboardLink'>
                                            <img src='http://localhost:3000/static/media/user-gear.3f58436e0da6510255f1.png'></img>
                                        </Link>
                                     )
                                }
                                else if(localStorage.getItem('role') === "WORKER"){
                                    return(
                                        <Link to="/employee-dashboard" className='dashboardLink'>
                                            <img src='http://localhost:3000/static/media/user-gear.3f58436e0da6510255f1.png'></img>
                                        </Link>
                                    )
                                }
                            })()}
                            <div className='userInfo'>
                                <span>{localStorage.getItem('name')}  {localStorage.getItem('lastName')}</span>
                            </div>
                            <div className='logout' onClick={logout}>
                                Wyloguj
                            </div>
                        </div>
                        :
                        <div className='logInButtons'>
                            <Link to="/login" className="btn btn-outline-success my-2 my-sm-0 logButton">Zaloguj się</Link>
                            <Link to="/rejestracja" className="btn my-2 my-sm-0 regButton">Zarejestruj się</Link>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Navigation;