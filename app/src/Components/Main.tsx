import SignUp from "./forms/SignUp";
import Login from "./forms/Login";
import Play from "./game/Play";
import Winners from "./game/Winners";
import PrivateRoutes from "./utility/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Main = () => {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              GameYams
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/game"}>
                    Play
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/winners"}>
                    Winners
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route element={<PrivateRoutes />}>
                <Route element={<Play/>} path="/game"/>
                <Route element={<Winners/>} path="/winners"/>
            </Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Main;