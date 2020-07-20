import React from 'react';
import { Navbar, Button, Container, Card } from 'react-bootstrap'
import List from '../list/List'

function Routines(props){
    return(
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Routines</Navbar.Brand>
        </Navbar>
        <Container style={{padding:"1em"}}>
            <Button onClick={(e) => { props.onChange("App") }} variant="secondary">Back</Button>
        </Container>
        <Container style={{padding: "2em"}}>
            <Card style={{padding: "8px"}}>
                <List style={{padding: "5px"}} />
            </Card>
        </Container>
        </>
    );
}

export default Routines;