import React from 'react';
import { Navbar, Button, Container, Row, Col, Card, Form, FormControl } from 'react-bootstrap'
import NotesList from '../notes/NotesList'

function Notes(props){
    return(
        <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Notes</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Button onClick={(e) => {props.onChange("About")}}>About</Button>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
        <Container style={{padding:"1em"}}>
            <Button onClick={(e) => { props.onChange("App") }} variant="secondary">Back</Button>
        </Container>
        <Container style={{padding: "2em"}}>
            <Card style={{padding: "8px"}}>
                <NotesList style={{padding: "5px"}} />
            </Card>
        </Container>
        </>
    );
}

export default Notes;