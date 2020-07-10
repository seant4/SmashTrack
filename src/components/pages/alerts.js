import React from 'react';
import { Navbar, Button, Container, Row, Col, Card } from 'react-bootstrap'
import AlertList from '../alerts/Alerts'

function Alerts(props){
    return(
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Alerts</Navbar.Brand>
        </Navbar>
        <Container style={{padding:"1em"}}>
            <Button onClick={(e) => { props.onChange("App") }} variant="secondary">Back</Button>
        </Container>
        <Container style={{padding: "2em"}}>
            <Card style={{padding: "8px"}}>
                <AlertList style={{padding: "5px"}} />
            </Card>
        </Container>
        </>
    );
}

export default Alerts;