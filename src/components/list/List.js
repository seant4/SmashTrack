import React, { useState, useEffect } from 'react';
import './List.css';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import { Container, Button, Form , InputGroup, FormControl, ButtonGroup, ButtonToolbar} from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import FileSaver, { saveAs } from 'file-saver';

import twitter from "./twitter.png"
import discord from "./discord.png"
import gmail from "./gmail.png"



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
                        <Form.Control onChange={(e)=>{todo.content=e.target.value; localStorage.setItem("r" + todo.text, todo.content)}} as="textarea" rows="15" spellcheck="false">{todo.content}</Form.Control>
                    </Form.Group>
                  </Form>
                  <Button onClick={() =>{ onClose() }}>Close</Button>
                </div>
              )
            }
          })
    }

    const handleExport = (todo) =>{
        let title = todo.text + "Routine.txt"
        let blob = new Blob([todo.content], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, title);
    }

    const handleShare = (todo) =>{
        let twitterShare = "https://twitter.com/intent/tweet?text=" + todo.content;
        let emailShare = "mailto:?subject=My " + todo.text + " routine&body=" + todo.content;
        confirmAlert({
            customUI: ({ onClose }) =>{
                return (
                    <div className='custrom-ui'>
                        <h1>{todo.text} Raw Paste</h1>
                        <Form>
                            <Form.Group controlId="exampleForm.controlTextarea1">
                                <Form.Control as="textarea" rows="15">{todo.content}</Form.Control>
                            </Form.Group>
                        </Form>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup className="mr-2" aria-label="First group">
                                <Button onClick={()=>{onClose()}} variant="secondary">Close</Button>
                            </ButtonGroup>
                            <ButtonGroup className="mr-2" aria-label="Second group">
                                <Button href={twitterShare}><img src={twitter} alt="Twitter" href={twitterShare} /></Button> <Button href={emailShare}><img src={gmail} alt="Email" /></Button><Button onClick={(e)=> {handleExport(todo)}}>Export</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                )
            }
        })
    }

    const handleImport = () =>{
        var input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => { 
            // getting a hold of the file reference
            var file = e.target.files[0]; 
            // setting up the reader
            var reader = new FileReader();
            reader.readAsText(file,'UTF-8');
            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!
            let text = {text: file.name.substr(0, file.name.length - 4), content: content}
            const updatedToDoList = [...toDoList,  {text: file.name.substr(0, file.name.length - 4), content: content} ];
            localStorage.setItem("r" + file.name.substr(0, file.name.length - 4), text.content )
            setToDoList(updatedToDoList)
            }
        }
        input.click();
    }

    return (
        <>
        <Container className='toDoInput'>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <Button onClick={handleSubmit} variant="outline-secondary">+</Button>
                    <Button onClick={(e) => {handleImport()}} variant="outline-secondary">Import</Button>
                </InputGroup.Prepend>
                <FormControl placeholder="Name" onChange={e => setValue(e.target.value)} aria-describedby="basic-addon1" />
            </InputGroup>
        <Container className='toDoList'>
        {
            toDoList.map((todo, index) => (
                <div key={index}>
                    <ButtonGroup style={{padding: "5px"}}>
                        <Button className="Routine" variant="primary" onClick= {() => handleRoutine(todo)} block>{todo.text}</Button>
                        <Button variant="secondary" onClick= {() => handleShare(todo)}>Share</Button>
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