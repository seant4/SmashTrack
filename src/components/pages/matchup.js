import React, {useState, useEffect} from 'react';
import { Navbar, Button, Container, ListGroup, ListGroupItem, Card } from 'react-bootstrap'
import charJson from '../../json/fighter.json';
import useForceUpdate from 'use-force-update';


function Matchup(props){
    const forceUpdate = useForceUpdate();
    const [matchUpList, setMatchUpList] = useState({});

    useEffect(()=>{
        if(localStorage.getItem('MatchUpFlag') != 'true'){
            console.log("in false homeboi")
            localStorage.setItem('Matchups', JSON.stringify(charJson))
            setMatchUpList(JSON.parse(localStorage.getItem('Matchups')));
            localStorage.setItem('MatchUpFlag', 'true');
            localStorage.setItem('MatchupToLearn', 'Nothing yet')
        }else{
            setMatchUpList(JSON.parse(localStorage.getItem('Matchups')));
        }
    }, [])

    const handleAdd = (name, value) =>{
        console.log(matchUpList)
        let upDate = matchUpList;
        for(const property in upDate){
            if(property === name){
                upDate[property] = upDate[property] += 1;
            }
        }
        setMatchUpList(upDate);
        localStorage.setItem('Matchups', JSON.stringify(matchUpList))
        forceUpdate();
        handleMatchup();
    }

    const handleSubtract = (name, value) =>{
        console.log(matchUpList)
        let upDate = matchUpList;
        for(const property in upDate){
            if(property === name){
                upDate[property] = upDate[property] -= 1;
            }
        }
        setMatchUpList(upDate);
        localStorage.setItem('Matchups', JSON.stringify(matchUpList));
        forceUpdate();
        handleMatchup();
    }

    const handleMatchup = () =>{
        let tmpName ="";
        let tmpNum = 0
        for(const property in matchUpList){
            if(matchUpList[property] < tmpNum){
                tmpName = property;
                tmpNum = matchUpList[property]
            }
        }
        if(tmpName !== ""){
            localStorage.setItem('MatchupToLearn', tmpName);
        }else{
            localStorage.setItem('MatchupToLearn', null)
        }
    }

    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Matchups</Navbar.Brand>
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
                <Card style={{ width: '20rem', position: "relative", padding: "5px", margin: "0 auto"}}>
                <Card.Img variant="top" />
                <Card.Body>
                    <Card.Title>Record your matchup records</Card.Title>
                    <Card.Text>
                        Record each win (+) and loss (-) for each character below, we'll decide what the best matchup for you to learn based on your win rates as well as the meta
                    </Card.Text>
                    {
                    Object.entries(matchUpList).map((char, index) => (
                        <div key={index}>
                            <ListGroup style={{padding: "5px"}}>
                                <ListGroup>
                                    <ListGroupItem block>{char[0]}</ListGroupItem>
                                    <ListGroup style={{display: "flex", justifyContent: "center", alignItems: "center"}} horizontal block>
                                        <ListGroupItem block><Button variant="primary" onClick={(e) => handleAdd(char[0], char[1])}>+</Button></ListGroupItem>
                                        <ListGroupItem block>{char[1]}</ListGroupItem>
                                        <ListGroupItem><Button variant="danger" onClick={(e) => {handleSubtract(char[0], char[1])}}>-</Button></ListGroupItem>
                                    </ListGroup>
                                </ListGroup>
                            </ListGroup>
                        </div>
                    ))
                    }
                </Card.Body>
                
                </Card>
            </Container> 
        </>
    )
}

export default Matchup;