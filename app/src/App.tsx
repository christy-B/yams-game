import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect } from 'react';
import { fetchData } from './Components/apiCall/FetchData';
import { useDispatch } from 'react-redux';
import { playAuthorization } from './redux/authSlice';
import Header from './Components/utility/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Winners from './Components/game/Winners';
import Login from './Components/forms/Login';
import SignUp from './Components/forms/SignUp';
import Play from './Components/game/Play';
import PrivateRoutes from './Components/utility/PrivateRoutes';

function App() {
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchPatries = async () => {
      try {
        const patries = await fetchData(`${baseUrl}/patries/getCollection`, 'GET');
        
        let totalStock = 0;
        let totalQuantityWon = 0;
        patries.forEach((patrie: any) => {
          totalStock += patrie.stock;
          totalQuantityWon += patrie.quantityWon;
        });

        if (totalQuantityWon < totalStock) {
          dispatch(playAuthorization());
        } else {
          console.log(totalStock, totalQuantityWon);
        }
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatries();
  }, []);

  return (
    <div className="App"> 
      <Router>
        <Header />
        <div>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign-in" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route element={<PrivateRoutes />}>
                  <Route path="/game" element={<Play />} />
                  <Route path="/winners" element={<Winners />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
