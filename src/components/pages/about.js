//attribute  Vecteezy for icon
import React from 'react';
import { Navbar, Button, Container, Card, CardDeck } from 'react-bootstrap'

function About(props){
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Learn</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                      <Button onClick={(e) => {props.onChange("About")}}>About</Button>
                  </Navbar.Text>
              </Navbar.Collapse>
            </Navbar>
            <Container style={{padding:"1em"}}>
                <Button onClick={(e) => { props.onChange("App") }} variant="secondary">Back</Button>
            </Container>
            <CardDeck>
                <Card>
                    <Card.Body>
                        <Card.Title>Project Lead</Card.Title>
                        <Card.Text>
                            SmashTrack was developed by Sean "NCSha" Theisen.Sean is an Smash Ultimate and Melee player. Sean is the lead developer of SmashTrack
                        </Card.Text>
                        </Card.Body>
                        </Card>
                        <Card>
                          <Card.Body>
                            <Card.Title>Project Organizers</Card.Title>
                            <Card.Text>
                                JoshyWoshy, Cactus, Leen, Quill all worked as Project Organizers. The functions, systems and features of the app where all developed with the Project Organizers
                            </Card.Text>
                          </Card.Body>
                        </Card>
                    </CardDeck>
        </>
    );
}

export default About;