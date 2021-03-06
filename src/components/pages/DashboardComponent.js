import React, { useState, useEffect } from 'react';
import './Dashboard.css';

import { Navbar, Button, Container, Row, Col, Form , InputGroup, FormControl, ButtonGroup, Card, ListGroup } from 'react-bootstrap'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import trendingLogo from '../../assets/trending.png'
import swordLogo from '../../assets/sword.png'
import routinesLogo from '../../assets/routinesLogo.png'
import notesLogo from '../../assets/notesLogo.png'
import performanceLogo from  '../../assets/performanceLogo.png'
import matchupLogo from '../../assets/matchupLogo.png'
import learnLogo from '../../assets/learnLogo.png'

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

import dat from '../../json/trending.json';


function handlePerformance(data, setData){
    let name = "";
    let result = 0;
    confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='custom-ui'>
                <h1>Add Event Result</h1>
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label></Form.Label>
                    <Form.Control onChange={(e)=> {name=e.target.value}} placeholder="Name"></Form.Control>
                    <br></br>
                    <Form.Control placeholder="Result in Fraction form EX: 7/41" onChange={(e)=> {result=e.target.value}} />
                </Form.Group>
              </Form>
              <Button onClick={() => {handleClose(name, result, data, setData); onClose()}} > Add </Button>
              <p></p>
              <Button onClick={() => {setData([]); handleErase(); onClose()}}>Erase Data</Button>
            </div>
          )
        }
      })
}

function handleErase(){
    for(let i in localStorage){
        if(i.substr(0,1) === "p"){
            localStorage.removeItem(i)
        }
    }
}

function handleClose(name, result, data, setData){
    if(result === 0){
        ;
    }else{
        console.log(name + " " + result)
        let event = {
            name: name,
            event: eval(result)
        }
        setData([...data, event])
        localStorage.setItem("p" + name, result)
        console.log(data)
    }
}

function DashboardComponent(props){
    const [data, setData] = useState([])
    const [matchupToLearn, setMatchupToLearn] = useState ('');
    const [trending, setTrending] = useState({})
    useEffect(()=>{
        setTrending(dat);
        //Load custom matchup
        if(localStorage.getItem('MatchupToLearn') === null || localStorage.getItem('MatchupToLearn') === "null"){
            setMatchupToLearn("Nothing yet!")
        }else{
            setMatchupToLearn("You should look into the " + localStorage.getItem('MatchupToLearn') + " matchup");
        }
        let temp = []
        for(let i in localStorage){
            if(localStorage.getItem(i) !== null){
                if(i.substr(0,1) === "p"){
                    temp.push({name: i.substring(1, i.length),
                                event: eval(localStorage.getItem(i))})
                }
            }
        }
        setData(temp)
    },[])
    console.log(trending["Trending Melee Character: "])
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Dashboard</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Button onClick={(e) => {props.onChange("About")}}>About</Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

            <br></br>

            <Card style={{width : '22rem', position: "relative", padding: "5px", margin: "0 auto"}}>
                <Card.Body>
                    <img style={{width: '15%'}} src={swordLogo} />
                    <br></br>
                    <Card.Title>{matchupToLearn}</Card.Title>
                    <ListGroup>
                        <ListGroup.Item><img src={trendingLogo} style={{width: '30%'}}/></ListGroup.Item>
                        <ListGroup.Item>Trending Ultimate Character: {trending["Trending Ultimate Character: "]}</ListGroup.Item>
                        <ListGroup.Item>Trending Ultimate Player: {trending["Trending Ultimate Player: "]}</ListGroup.Item>
                        <ListGroup.Item>Trending Melee Character: {trending["Trending Melee Character: "]}</ListGroup.Item>
                        <ListGroup.Item>Trending Melee Player: {trending["Trending Melee Player: "]}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>

            <br></br>
            <Container style={{padding: '2em'}}>
                <Button  onClick={(e) => { props.onChange("Routines") }} variant="secondary" size="lg" block>
                    <img style={{width: '5%'}} src={routinesLogo} /> Routines
                </Button>
                <Button  onClick={(e) => { props.onChange("Notes") }} variant="secondary" size="lg" block>
                    <img style={{width: '5%'}} src={notesLogo} /> Notes
                </Button>
                <Button onClick={(e)=> { props.onChange("Matchups") }} variant="secondary" size="lg" block>
                    <img style={{width: '5%'}} src={matchupLogo} /> Matchups
                </Button>
                <Button onClick={(e)=> { props.onChange("Learn") }} variant="secondary" size="lg" block>
                    <img style={{width: '5%'}} src={learnLogo} /> Learn
                </Button>
            </Container>
        </>
    );
}

export default DashboardComponent;