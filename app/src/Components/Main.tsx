import SignUp from './forms/SignUp';
import Login from './forms/Login';
import Play from './game/Play';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Main = () => {

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              GameYams
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Login apiUrl='http://localhost:5050/api/user/login' method='POST' />} />
              <Route path="/sign-in" element={<Login apiUrl='http://localhost:5050/api/user/login' method='POST' />} />
              <Route path="/sign-up" element={<SignUp apiUrl='http://localhost:5050/api/user/signup' method='POST' />} />
              <Route path="/game" element={<Play apiUrl='http://localhost:5050/api/dice/roll-dice' method='GET'/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Main;
