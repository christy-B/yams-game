//Components/forms/Login./tsx

import { useState } from "react";
import { IBody } from "../types/ISignIn";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../apiCall/FetchData";
import { useDispatch } from "react-redux";
import { loginSuccess, playWin } from "../../redux/authSlice";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const dispatch = useDispatch();

  const baseUrl = import.meta.env.VITE_BASE_URL

  // le corps de l'api
  const body: IBody = {
    email: email,
    password: password
  }

  const handleChange = (event: any, setarg: any) => {
    setarg(event.target.value);
  }


  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire
    const url = import.meta.env.VITE_BASE_URL + "/user/login"
    try {
      const result = await fetchData(url, 'POST', '', body);
      if (result.token) {
        let token = result.token;
        localStorage.setItem("token", token);
        dispatch(loginSuccess({ email, token }));
        //checker si la personne a deja gagné une patisserie
        const patries = await fetchData(`${baseUrl}/patries/getCollection`, 'GET', token);
        for (let i = 0; i < patries.length; i++) {
          const winners = patries[i].winners;
          for (let j = 0; j < winners.length; j++) {
            if (winners[j].email === email) {
              dispatch(playWin());
            }
          }
        }
        navigate("/game");
      }
    } catch (error) {
      setError("Failed to sign up. Please try again.");
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <div>{error}</div>
      <h3>Connexion</h3>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          required
          onChange={(e) => handleChange(e, setEmail)}
        />
      </div>
      <div className="mb-3">
        <label>Mot de passe</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          required
          onChange={(e) => handleChange(e, setPassword)}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Se connecter
        </button>
      </div>
    </form>
  );
}

export default Login;