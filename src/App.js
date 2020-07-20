import React, {useState, useEffect } from 'react';
import Dashboard from './components/pages/DashboardComponent'
import Routines from './components/pages/RoutinesComponent'
import Alerts from './components/pages/alerts'

import './App.css';

function App() {

  const [page, setPage] = useState("Dashboard");

  useEffect(()=>{
    let notifs = [];
    for(let i in localStorage){
      if(i.substring(0,1) === "a"){
        notifs.push({name: i, time: localStorage.getItem(i)})
      }
    }
    console.log("sending!")
    navigator.serviceWorker.controller.postMessage(notifs);
  }, []);

  if(page === "Routines"){
    return (
      <div className="App">
        <Routines page={page} onChange={(value) =>{setPage(value)}} />
      </div>
    );
    }else if(page === "Alerts"){
      return(
        <div className="App">
          <Alerts page={page} onChange={(value) =>{setPage(value)}} />
        </div>
      );
  }else{
    return (
      <div className="App">
        <Dashboard page={page} onChange={(value) => {setPage(value)}} />
      </div>
    )
    
  }
}

export default App;
