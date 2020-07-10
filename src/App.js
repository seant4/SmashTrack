import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import Dashboard from './components/pages/DashboardComponent'
import Routines from './components/pages/RoutinesComponent'
import Alerts from './components/pages/alerts'
import List from './components/list/List'
import './App.css';

function App() {
  const [page, setPage] = useState("Dashboard");

  function handleChange(newPage){
    setPage=newPage
  }

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
