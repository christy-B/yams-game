//Components/forms/Login./tsx

import { useState } from "react";
import { IBody } from "../types/ISignIn";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../apiCall/FetchData";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const dispatch = useDispatch();

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
        dispatch(loginSuccess({ email, token }));
        navigate("/game");
      }
    } catch (error) {
      setError("Failed to sign up. Please try again.");
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <div>{error}</div>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          required
          onChange={(e) => handleChange(e, setEmail)}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
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
          Submit
        </button>
      </div>
    </form>
  );
}

export default Login;