import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "../apiCall/FetchData";
import moment from 'moment';

const Winners = () => {
    const [patrieWin, setPatrieWin] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);

    const canPlay = useSelector((state: any) => state.auth.canPlay);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const token = useSelector((state: any) => state.auth.token);

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
                const patries = await fetchData(`${baseUrl}/patries/getCollection`, 'GET', token);
                setPatrieWin(patries);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPatries();
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await fetchData(`${baseUrl}/user/getCollection`, 'GET', token);
                setUsers(user);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, []);


    return (
        <div className="container">
          <h3 className="text-center my-4">Liste des gagnants</h3>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Patisseries</th>
                <th>Nom & Prenom</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {patrieWin.map((patrie) =>
                patrie.winners.map((winner: any) => {
                  const user = users.find((user: any) => winner.email === user.email);
                  return (
                    <tr key={`${patrie.name}-${winner.email}`}>
                      <td>{patrie.name}</td>
                      <td>{user ? `${user.lastname} ${user.firstname}` : ''}</td>
                      <td>{moment(winner.date).format("YYYY-MM-DD")}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      );
}

export default Winners