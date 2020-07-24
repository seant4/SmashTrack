import React from 'react';
import { Navbar, Button, Container, Row, Col, Card, CardGroup, CardDeck } from 'react-bootstrap'
import BattleField from "../../../src/assets/Battlefieldssbm.jpg"
import RyusStage from "../../../src/assets/RyusStage.jpg"

function Learn(props){
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
                    <Card.Img variant="top" src={BattleField} />
                    <Card.Body>
                        <Card.Title>Solo Practice</Card.Title>
                        <Card.Text>
                            Practicing Combos, Strings, Movement and Neutral options on your own will make the transition from learning to execution much easier. Practice options you leanred from analysis, and lab new ones where you are struggling to always be prepared. 
                        </Card.Text>
                        <Button href="https://smashboards.com/threads/falco-discussion-thread.256826/page-439">ShadowBoxing Guide</Button>
                        </Card.Body>
                        <Card.Footer>
                          <small className="text-muted">Image from Super Smash Bros. Melee</small>
                        </Card.Footer>
                        </Card>
                        <Card>
                          <Card.Img variant="top" src={RyusStage} />
                          <Card.Body>
                            <Card.Title>Analysis</Card.Title>
                            <Card.Text>
                              Vod analysis is important for any game, understanding your and your opponents options in a matchup is important to be prepared in a real tournament. It is also important to find your weaknesses and learn where you need to orient your practice
                            </Card.Text>
                            <Button href="http://team-dignitas.net/articles/blogs/smash/14070/making-your-analysis-effective-a-guide-to-vod-analysis">Analysis Guide</Button>
                          </Card.Body>
                          <Card.Footer>
                            <small className="text-muted">Image from StreetFighter II</small>
                          </Card.Footer>
                        </Card>
                    </CardDeck>
        </>
    );
}

export default Learn;