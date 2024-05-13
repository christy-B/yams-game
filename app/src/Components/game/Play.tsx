import { UseFetchData } from "../apiCall/FetchData";
import { useState } from "react";

const Play = ({ apiUrl, method }: { apiUrl: string, method: string }) => {
    const [diceResult, setDiceResult] = useState([]);
    const [attempt, setAttempt] = useState(0);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [combinaison, setCombinaison] = useState([]);
    const [win, setWin] = useState(false);
    const [patrieWin, setPatrieWin] = useState(0);
    //const { datas, fetchData } = UseFetchData(apiUrl, method) as {datas:any, fetchData: (body: any) => void };

    const diceCombine = combinaison.map((((dice:any) => <span>{dice}</span>)))
    
    const handleClick = async () => {
        if (!win) {
            if (attempt<3) {
                try {
                    const data = await (await fetch(apiUrl)).json()
                    setDiceResult(data.result)
                    setCombinaison(data.diceValues)
                    setAttempt(attempt + 1)
                    if (data.result != "LOST") {
                        setWin(true)
                        if (data.result == "YAM'S") {
                            setPatrieWin(3);
                        }
                        if (data.result == "CARRÉ") {
                            setPatrieWin(2);
                        }
                        if (data.result == "DOUBLE") {
                            setPatrieWin(1);
                        }

                    }
                    setMessage("vous avez gagné" +" " + patrieWin + " " + "patisserie(s)")
                } catch (err:any) {
                    console.log(err);
                }
            } else setError("nombre de tentative terminé")
        } 
    }
    
    
    return (
        <div>
            <h3>attempt: {attempt}/3</h3>
            <p>{error}</p>
            <p> {diceResult}: {message} </p>
            <p>{diceCombine}</p>
            <button type="submit" className="btn btn-primary" onClick={handleClick}> Roll </button>
        </div>
    );
}

export default Play;
