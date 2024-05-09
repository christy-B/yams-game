import { useState } from 'react';

export const UseFetchDataAuth = (apiUrl: string) => {
  const [datas, setData] = useState([]);
  const [error, setError] = useState(null);

  const FetchDataAuth = (method: string, jwt: String) => {

    fetch(apiUrl, {
      method: method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + jwt,
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },

    })
      .then(response => {
        console.log(response)
        if (!response.ok) {
          throw new Error('La requête a échoué');
        }
        return response.json();
      })
      .then(data => {
        setData(data['data']);
      })
      .catch(error => {
        setError(error);
      });
  };

  return { datas, error, FetchDataAuth };
};

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
        setData(data['data']);
        console.log(data);
      })
      .catch(error => {
        setError(error);
      });
  };

  return { datas, error, fetchData };
};