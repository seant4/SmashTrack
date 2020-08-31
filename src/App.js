import React, {useState, useEffect } from 'react';
import Dashboard from './components/pages/DashboardComponent'
import Routines from './components/pages/RoutinesComponent'
import Notes from './components/pages/notes'
import Learn from './components/pages/learn'
import About from './components/pages/about'
import Matchup from './components/pages/matchup'

import './App.css';

function App() {

  const [page, setPage] = useState("Dashboard");


  if(page === "Routines"){
    return (
      <div className="App">
        <Routines page={page} onChange={(value) =>{setPage(value)}} />
      </div>
    );
  }else if(page === "Learn"){
    return(
      <div className="App">
        <Learn page={page} onChange={(value) =>{setPage(value)}} />
      </div>
    )
    }else if(page === "Notes"){
      return(
        <div className="App">
          <Notes page={page} onChange={(value) =>{setPage(value)}} />
        </div>
      );
    }else if(page === "About"){
      return(
        <div className="App">
          <About page={page} onChange={(value) =>{setPage(value)}} />
        </div>
      );
      }else if(page === "Matchups"){
        return(
          <div className="App">
            <Matchup page={page} onChange={(value) => {setPage(value)}} />
          </div>
        )
    }else{
      return (
        <div className="App">
          <Dashboard page={page} onChange={(value) => {setPage(value)}} />
        </div>
    )
  }
}

export default App;
