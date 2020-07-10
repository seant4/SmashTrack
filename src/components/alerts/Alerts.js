import React, { useState } from 'react';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { Container, Button, Alert, Form, Col, InputGroup, FormControl, ButtonGroup} from "react-bootstrap"


import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";




function Alerts(){
    const [toDoList, setToDoList] = useState([]);

    const [value, setValue] = useState(' ');

    const handleSubmit = (e) => {
        e.preventDefault();
        addToDo(value);
    };
    
    const addToDo = (text) => {
        const updatedToDoList = [...toDoList, { text }];
        localStorage.setItem(text, "This is a test")
        setToDoList(updatedToDoList)
    };

    const handleDelete = (todo) =>{
        const filteredToDoList = toDoList.filter(currentToDoListValue => (currentToDoListValue !== todo));
        setToDoList(filteredToDoList)
    };

    const handleRoutine = (todo) =>{
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                    <h1>{todo.text} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   &nbsp; &nbsp; </h1>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>My {todo.text} routine:</Form.Label>
                        <Form.Control onChange={(e)=>todo.content=e.target.value} as="textarea" rows="15">{todo.content}</Form.Control>
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
                    <Button onClick={handleSubmit} variant="outline-secondary">Add new alert</Button>
                </InputGroup.Prepend>
                <FormControl placeholder={value} onChange={e => setValue(e.target.value)} aria-describedby="basic-addon1" />
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
                                <Form.Control placeholder="Time" />
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