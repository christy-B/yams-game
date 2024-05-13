import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState, useEffect } from 'react';
import Main from './Components/Main';

function App() {
  const [canPlay, setCanPlay] =useState(false)

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('http://localhost:5050/api/patries/getCollection')
        const patries = await response.json()
        
        let totalStock = 0;
        let totalQuantityWon = 0;
        patries.forEach((patrie: any) => {
          totalStock += patrie.stock;
          totalQuantityWon += patrie.quantityWon;
        });

        if (totalQuantityWon < totalStock) {
          setCanPlay(true)
        }else
        console.log(totalStock, totalQuantityWon, canPlay)
    };
    fetchData();
}, [])

  if (canPlay) {
    return <Main/>
  } else{
    return(
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container navbar-brand">
                GameYams
            </div>
        </nav>
        <p>toutes les patisseries ont été gagné</p>
      </div>
    )
  } 
}

export default App;
