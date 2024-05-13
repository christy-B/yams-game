import { useState } from 'react';

export const UseFetchData = (apiUrl:string, method:string) => {
  const [datas, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = (body: {}) => {
    fetch(apiUrl, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        if (data.token) {
          localStorage.setItem('token', JSON.stringify(data.token));
        }
      })
      .catch(error => {
        setError(error);
      });
  };

  return { datas, error, fetchData };
}