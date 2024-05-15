import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../apiCall/FetchData";
import { logout } from "../../redux/authSlice";
import { IBody } from "../types/IPlay";

const Play = () => {
  const [diceResult, setDiceResult] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [combinaison, setCombinaison] = useState([]);
  const [win, setWin] = useState(false);
  const [availablePastries, setAvailablePastries] = useState<any[]>([]);
  const [patrieId, setPatrieId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL
  const email = useSelector((state: any) => state.auth.email);
  const token = useSelector((state: any) => state.auth.token);

  const body: IBody = {
    email: email,
    quantityWon: 1,
  };
  
  useEffect(() => {
    const fetchPastries = async () => {
      try {
        const pastries = await fetchData(`${baseUrl}/patries/availables`, 'GET');
        setAvailablePastries(pastries);
      } catch (error) {
        console.error("Error fetching pastries:", error);
      }
    };
    fetchPastries();
  }, [patrieId]);

  const handleClick = async () => {
    if (!win) {
      if (attempt < 3) {
        try {
          const data = await fetchData(`${baseUrl}/dice/roll-dice`, 'GET', token);
          if (data.message === "Access token expired") {
            dispatch(logout());
            navigate("/sign-in");
          }
          console.log(data)
          setDiceResult(data.result[0]);
          setCombinaison(data.diceValues);
          setAttempt(attempt + 1);

          if (data.result[0] !== "LOST") {
            let patrieWin = 0;
            setWin(true);
            if (data.result[0] === "YAM'S") {
              patrieWin = 3;
            } else if (data.result[0] === "CARRÉ") {
              patrieWin = 2;
            } else if (data.result[0] === "DOUBLE") {
              patrieWin = 1;
            }
            let id = "";
            for (let i = 0; i < Number(patrieWin); i++) {
              const randomIndex = Math.floor(Math.random() * availablePastries.length);
              const won = availablePastries[randomIndex];
              setPatrieId(won._id);
              console.log("won:", won)
              id = won._id;
              await fetchData(`${baseUrl}/patries/${id}/winners`, 'PUT', token, body);
            }
            setMessage(`Vous avez gagné ${patrieWin} pâtisserie(s)`);
          } else {
            setMessage("Vous n'avez pas gagné de pâtisserie.");
          }
        } catch (err) {
          setError("Une erreur est survenue lors du tirage des dés. Veuillez réessayer.");
        }
      } else {
        setError("Nombre de tentatives terminé.");
      }
    }
  };

  return (
    <div>
      <h3>Essais : {attempt}/3</h3>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
      <p>Résultat des dés : {diceResult}</p>
      <p>Combinaison : {combinaison.join(", ")}</p>
      <button type="button" className="btn btn-primary" onClick={handleClick} disabled={win}>
        Lancer les dés
      </button>
    </div>
  );
};

export default Play;

