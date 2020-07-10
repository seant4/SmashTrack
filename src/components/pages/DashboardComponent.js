import React, { useState } from 'react';
import './Dashboard.css';

import { Navbar, Button, Container, Row, Col, Form , InputGroup, FormControl, ButtonGroup } from 'react-bootstrap'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';



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
              <Button onClick={() => handleClose(name, result, data, setData)} > Close </Button>
            </div>
          )
        }
      })
}

function handleClose(name, result, data, setData){
    console.log(name + " " + result)
    let event = {
        name: name,
        event: eval(result)
    }
    setData([...data, event])
    console.log(data)
}

function DashboardComponent(props){
    const [data, setData] = useState([])
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Dashboard</Navbar.Brand>
            </Navbar>

            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
                style={{position: "relative", padding: "5px", margin: "0 auto"}}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis reversed/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="event" stroke="#82ca9d" />
            </LineChart>
            <br></br>
            <Container>
                <Button  onClick={(e) => { props.onChange("Routines") }} variant="secondary" size="lg" block>
                    Routines
                </Button>
                <Button variant="secondary" size="lg" block>
                    Alerts
                </Button>
                <Button onClick={(e) => {handlePerformance(data, setData)}} variant="secondary" size="lg" block>
                    Performance
                </Button>
                <Button variant="secondary" size="lg" block>
                    Learn
                </Button>
            </Container>
        </>
    );
}

export default DashboardComponent;