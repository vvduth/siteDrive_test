import axios from 'axios';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css';

function App() {
  const config = {
    headers: {
      "Content-Type": "application/graphql"
    }
  }
 
  const body2 = `{
    stops(name: "Innopoli") {
      gtfsId
      name
      code
      lat
      lon
    }
  }`
  const fetchData = async () => {
    try {
      const response = await axios.post(`https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql`, body2,config)
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

const AppWrapper = () => {
  return (
    <Provider store={store}>
    <App/>
  </Provider>
  )
}

export default AppWrapper;


