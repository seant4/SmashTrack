import React, { useState, useEffect } from 'react';

import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { Container, Button, Form, Col, InputGroup, FormControl} from "react-bootstrap"


import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";




function NotesList(){
    localStorage.setItem("notifFlag", false)
    const [toDoList, setToDoList] = useState([]);

    const [value, setValue] = useState(' ');

    useEffect(()=>{
        let updatedToDoList = [...toDoList]
        for(let i in localStorage){
            if(localStorage.getItem(i) !== null){
                if(i.substr(0,1)==="a"){
                    let item = {text: i.substring(1,i.length),
                                content: localStorage.getItem(i)}
                    updatedToDoList = [...updatedToDoList, item]
                }
            } 
        }
        setToDoList(updatedToDoList)
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        addToDo(value);
    };
    
    const addToDo = (text) => {
        const updatedToDoList = [...toDoList, { text }];
        localStorage.setItem("a" + text, text.content )
        setToDoList(updatedToDoList)
    };

    const handleDelete = (todo) =>{
        const filteredToDoList = toDoList.filter(currentToDoListValue => (currentToDoListValue !== todo));
        setToDoList(filteredToDoList)
        for(let i in localStorage){
            if(i.substr(0,1) === "a"){
                localStorage.removeItem(i)
            }
        }
        for(let i in filteredToDoList){
            console.log(filteredToDoList[i].text, filteredToDoList[i].content)
            localStorage.setItem("a" + filteredToDoList[i].text, filteredToDoList[i].content)
        }
    };

    return (
        <>
        <Container className='toDoInput'>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <Button onClick={handleSubmit} variant="outline-secondary">+</Button>
                </InputGroup.Prepend>
                <FormControl placeholder={value} onChange={e => setValue(e.target.value)} aria-describedby="basic-addon1" placeholder="Note name" />
            </InputGroup>
        <Container  className='toDoList'>
        {
            toDoList.map((todo, index) => (
                <div key={index}>
                    <InputGroup style={{position: "relative", padding: "5px", margin: "0 auto"}}>
                    <Form style={{position: "relative", padding: "5px", margin: "0 auto"}}>
                        <Form.Row>
                        <Col xs={6}>
                            <Form.Control readOnly defaultValue={todo.text}/>
                            <div style={{padding: "5px"}} ><Button variant="danger"  onClick={((e) => {handleDelete(todo);})}>Delete</Button></div>  
                        </Col>
                        <Col>
                            <Form.Control as="textarea" rows="3" columns="8" onChange={(e)=>{todo.content=e.target.value; localStorage.setItem("a" + todo.text, todo.content); }} placeholder="My note">{(todo.content === undefined || todo.content === "undefined") ? "My note" : todo.content}</Form.Control>
                        </Col>
                        </Form.Row>
                    </Form>
                    </InputGroup>
                </div>
            ))
        }
        </Container>
        </Container>
        </>
    );
}

export default NotesList