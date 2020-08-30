import React, {useState, useEffect} from 'react';
import { Navbar, Button, Container, ListGroup, ListGroupItem } from 'react-bootstrap'
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
                {
                    Object.entries(matchUpList).map((char, index) => (
                        <div key={index}>
                            <ListGroup style={{padding: "5px"}}>
                                <ListGroup>
                                    <ListGroupItem block>{char[0]}</ListGroupItem>
                                    <ListGroup style={{display: "flex", justifyContent: "center", alignItems: "center"}} horizontal block>
                                        <ListGroupItem block><Button variant="outline-primary" onClick={(e) => handleAdd(char[0], char[1])}>+</Button></ListGroupItem>
                                        <ListGroupItem block>{char[1]}</ListGroupItem>
                                        <ListGroupItem><Button variant="outline-danger" onClick={(e) => {handleSubtract(char[0], char[1])}}>-</Button></ListGroupItem>
                                    </ListGroup>
                                </ListGroup>
                            </ListGroup>
                        </div>
                    ))
                }
            </Container> 
        </>
    )
}

export default Matchup;