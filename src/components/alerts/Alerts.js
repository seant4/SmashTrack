import React, { useState, useEffect } from 'react';

import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { Container, Button, Form, Col, InputGroup, FormControl} from "react-bootstrap"

import {setTimes} from "./notifManager.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";




function Alerts(){
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
        if(localStorage.getItem("notifFlag") === false){
            Notification.requestPermission().then(function(result){
                if(result === 'granted'){
                    localStorage.setItem("notifFlag", true)
                }
                
            })
        }
        //

        e.preventDefault();
        addToDo(value);
        setTimes();
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
                    <Button onClick={handleSubmit} variant="outline-secondary">Add new note</Button>
                </InputGroup.Prepend>
                <FormControl placeholder={value} onChange={e => setValue(e.target.value)} aria-describedby="basic-addon1" placeholder="Note name" />
            </InputGroup>
        <Container className='toDoList'>
        {
            toDoList.map((todo, index) => (
                <div key={index}>
                    <Form>
                        <Form.Row>
                        <Col>
                            <Form.Control plaintext readOnly defaultValue={todo.text} />
                        </Col>
                            <Col>
                                <Form.Control as="textarea" rows="3" onChange={(e)=>{todo.content=e.target.value; localStorage.setItem("a" + todo.text, todo.content); setTimes(); }} placeholder="My note">{todo.content}</Form.Control>
                            </Col>
                        </Form.Row>
                    </Form>
                </div>
            ))
        }
        </Container>
        </Container>
        </>
    );
}

export default Alerts