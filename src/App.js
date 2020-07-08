import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import Dashboard from './components/DashboardComponent'
import Routines from './components/RoutinesComponent'
import './App.css';

function App() {
  const [page, setPage] = useState("Dashboard");

  function handleChange(newPage){
    setPage=newPage
  }

  if(page === "Routines"){
    return (
      <div className="App">
        <Routines />
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
