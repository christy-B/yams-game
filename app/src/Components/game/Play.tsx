import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../apiCall/FetchData";
import { logout } from "../../redux/authSlice";
import { IBody } from "../types/IPlay";
import { Link } from 'react-router-dom';

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
  const isWin = useSelector((state: any) => state.auth.isWin);
  const canPlay = useSelector((state:any) => state.auth.canPlay);

  const body: IBody = {
    email: email,
    quantityWon: 1,
  };
  
  
  if (!canPlay) {
    return(
      <div>
        <p>Toutes les patisseries ont été gagné</p>
        <Link className="nav-link" to="/winners" style={{backgroundColor:'#0FFF0F', width:"150px", margin:'auto', borderRadius:'10px', padding:'5px'}}>Liste des gagnants</Link>
      </div>
    )
  }

  if (isWin) {
    return(
      <div>
        <p>Vous avez deja jouer et gagner </p>
        <Link className="nav-link" to="/winners" style={{backgroundColor:'#0FFF0F', width:"150px", margin:'auto', borderRadius:'10px', padding:'5px'}}>patisseri(e) gagné(s)</Link>
      </div>
    )
  }

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
            setWin(true);
            setMessage(`${patrieWin} pâtisserie(s) gagné(s)`);
          } else {
            setMessage(" 0 pâtisserie gagné");
          }
        } catch (err) {
          setError("Une erreur est survenue lors du tirage des dés. Veuillez réessayer.");
        }
      } else {
        setWin(true);
        setError("Nombre de tentatives terminé."); 
      }
    }
  };

  return (
    <div>
      <h3>Essais : {attempt}/3</h3>
      <p>{error}</p>
      <p className="diceResult">{diceResult}</p>
      <div className="dice-btn">
        <button type="button" className="btn btn-success">
          {combinaison.length > 0 ? combinaison[0] : '0'}
        </button>
        <button type="button" className="btn btn-success">
          {combinaison.length > 0 ? combinaison[1] : '0'}
        </button>
        <button type="button" className="btn btn-success">
          {combinaison.length > 0 ? combinaison[2] : '0'}
        </button>
        <button type="button" className="btn btn-success">
          {combinaison.length > 0 ? combinaison[3] : '0'}
        </button>
        <button type="button" className="btn btn-success">
          {combinaison.length > 0 ? combinaison[4] : '0'}
        </button>
      </div>
      <button type="button" className="btn btn-primary" onClick={handleClick} disabled={win}>
        Lancer les dés
      </button>
      <p className="msg">{message}</p>
    </div>
  );
};

export default Play;

