import { useState } from "react";
import { UseFetchData } from "../apiCall/FetchData";
import { IBody } from "../types/ISignUp";
import { useNavigate  } from "react-router-dom";

const SignUp = ({ apiUrl, method }: { apiUrl: string, method: string }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate ();
  const { fetchData } = UseFetchData(apiUrl, method) as { fetchData: (body: IBody) => void };

  // le corps de l'api
  const body: IBody = {
    firstname: firstName,
    lastname: lastName,
    email: email,
    password: password
  }

  const handleChange = (event: any, setarg: any) => {
    setarg(event.target.value);
  }

  const handleSubmit = async(event: any) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire
    try {
      // Appelez fetchData pour soumettre les données
      await fetchData(body);
      // Rediriger vers la page de connexion si l'inscription est réussie
      navigate("/sign-in")
    } catch (error) {
      // Afficher le message d'erreur en cas d'échec de l'inscription
      setError("Failed to sign up. Please try again.");
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          required
          onChange={(e) => handleChange(e, setFirstName)}
        />
      </div>
      <div className="mb-3">
        <label>Last name</label>
        <input type="text" className="form-control" placeholder="Last name" required onChange={(e) => handleChange(e, setLastName)} />
      </div>
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
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
      <div>{error}</div>
    </form>
  );
}

export default SignUp;