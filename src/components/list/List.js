import React, { useState, useEffect } from 'react';
import './List.css';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { Container, Button, Alert, Form , InputGroup, FormControl, ButtonGroup} from "react-bootstrap"


import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";




function List(){
    const [toDoList, setToDoList] = useState([]);

    const [value, setValue] = useState(' ');

    useEffect(()=>{
        let updatedToDoList = [...toDoList]
        for(let i in localStorage){
            if(localStorage.getItem(i) !== null){
                if(i.substr(0,1)==="r"){
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
        localStorage.setItem("r" + text, text.content )
        setToDoList(updatedToDoList)
    };

    const handleDelete = (todo) =>{
        const filteredToDoList = toDoList.filter(currentToDoListValue => (currentToDoListValue !== todo));
        setToDoList(filteredToDoList)
        for(let i in localStorage){
            if(i.substr(0,1) === "r"){
                localStorage.removeItem(i)
            }
        }
        for(let i in filteredToDoList){
            console.log(filteredToDoList[i].text, filteredToDoList[i].content)
            localStorage.setItem("r" + filteredToDoList[i].text, filteredToDoList[i].content)
        }
    };

    const handleSave = (todo) =>{
        console.log(todo + " " + todo.text)
    }

    const handleRoutine = (todo) =>{
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                    <h1>{todo.text} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   &nbsp; &nbsp; </h1>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>My {todo.text} routine:</Form.Label>
                        <Form.Control onChange={(e)=>{todo.content=e.target.value; localStorage.setItem("r" + todo.text, todo.content)}} as="textarea" rows="15">{todo.content}</Form.Control>
                    </Form.Group>
                  </Form>
                  <Button>Close</Button>
                </div>
              )
            }
          })
    }

    return (
        <>
        <Container className='toDoInput'>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <Button onClick={handleSubmit} variant="outline-secondary">Add new routine</Button>
                </InputGroup.Prepend>
                <FormControl placeholder={value} onChange={e => setValue(e.target.value)} aria-describedby="basic-addon1" />
            </InputGroup>
        <Container className='toDoList'>
        {
            toDoList.map((todo, index) => (
                <div key={index}>
                    <ButtonGroup style={{padding: "5px"}}>
                        <Button className="Routine" variant="primary" onClick= {() => handleRoutine(todo)} block>{todo.text}</Button>
                        <Button variant="danger" onClick = {() => handleDelete(todo)}>Delete</Button>
                    </ButtonGroup>
                </div>
            ))
        }
        </Container>
        </Container>
        </>
    );
}

export default List