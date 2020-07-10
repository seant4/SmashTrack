import React from 'react';
import './Dashboard.css';

import { Navbar, Button, Container, Row, Col } from 'react-bootstrap'

import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

  const data = [
    {
      name: 'Page A', event: 4000,
    },
  ];

function DashboardComponent(props){
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
                <YAxis />
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
                <Button variant="secondary" size="lg" block>
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