import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../apiCall/FetchData";

const Winners = () => {
    const [patrieWin, setPatrieWin] = useState<any[]>([]);
    const canPlay = useSelector((state: any) => state.auth.canPlay);
    const baseUrl = import.meta.env.VITE_BASE_URL;

    if (canPlay) {
        return (
            <div>
                <p>Le jeu est toujours en cours, consulter cette page a la fin des tirages</p>
                <Link className="nav-link" to="/game" style={{ backgroundColor: '#0FFF0F', width: "150px", margin: 'auto', borderRadius: '10px', padding: '5px' }}>Aller au jeu</Link>
            </div>
        )
    }

    useEffect(() => {
        const fetchPatries = async () => {
            try {
                const patries = await fetchData(`${baseUrl}/patries/getCollection`, 'GET');
                setPatrieWin(patries);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPatries();
    }, []);

    return (
        <div className="container">
          <h3 className="text-center my-4">Liste des gagnants</h3>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Patrie</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {patrieWin.map((patrie) =>
                patrie.winners.map((winner:any) => (
                  <tr key={`${patrie.name}-${winner.email}`}>
                    <td>{patrie.name}</td>
                    <td>{winner.email}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      );
}

export default Winners