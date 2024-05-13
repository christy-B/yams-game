import { useEffect, useState } from "react";
import { IBody } from "../types/ISignIn";
import { useNavigate } from "react-router-dom";
import { UseFetchData } from "../apiCall/FetchData";

const Login = ({ apiUrl, method }: { apiUrl: string, method: string }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { fetchData } = UseFetchData(apiUrl, method) as { fetchData: (body: IBody) => void };

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
    try {
      // Appelez fetchData pour soumettre les données
      await fetchData(body);
      navigate("/game");
    } catch (error) {
      // Afficher le message d'erreur en cas d'échec de l'inscription
      setError("Failed to sign up. Please try again.");
    }

  }

  return (
    <form onSubmit={handleSubmit}>
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
      <div>{error}</div>
    </form>
  );
}

export default Login;