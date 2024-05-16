import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

const Header = () => {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <div className="navbar-brand">GameYams</div>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            {!isAuthenticated && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/sign-in">Connexion</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/sign-up">Inscription</Link>
                                    </li>
                                </>
                            )}
                            {isAuthenticated && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/game">Jeu</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/winners">Gagnant</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn btn-link nav-link" onClick={handleLogout}>Deconnexion</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
