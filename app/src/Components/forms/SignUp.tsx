import { useState } from "react";
import { fetchData } from "../apiCall/FetchData";
import { IBody } from "../types/ISignUp";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const canPlay = useSelector((state:any) => state.auth.canPlay);
  if (!canPlay) {
    return(
      <div>
        <p>Toutes les patisseries ont été gagné</p>
      </div>
    )
  }
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

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire
    const url = import.meta.env.VITE_BASE_URL + "/user/signup"
    try {
      const result = await fetchData(url, 'POST', '', body);
      if (result) {
        navigate("/sign-in")
      }
    } catch (error) {
      setError("Failed to sign up. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>Nom</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          required
          onChange={(e) => handleChange(e, setFirstName)}
        />
      </div>
      <div className="mb-3">
        <label>Prenom</label>
        <input type="text" className="form-control" placeholder="Last name" required onChange={(e) => handleChange(e, setLastName)} />
      </div>
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
          S'inscrire
        </button>
      </div>
      <div>{error}</div>
    </form>
  );
}

export default SignUp;
