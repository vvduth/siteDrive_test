import axios from 'axios';
import React, { useEffect } from 'react';

import './App.css';

function App() {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  const body =  { "query": `{
    stop(id: \"HSL:1040129\") {
      name
      lat
      lon
      wheelchairBoarding
    }
  }` }
  const fetchData = async () => {
    try {
      const response = await axios.post(`https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`, body,config)
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
 }
  useEffect(() => {
    fetchData()
  }, [])

  
 
  
  return (
    <>
    </>
  );
}

export default App;


