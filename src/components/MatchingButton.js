import React from 'react';
import  io  from 'socket.io-client';
import { useForm,reset } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import "../style/SubmitButton.css";
import axios from 'axios';
import { useState, useRef } from 'react';
import "../style/LoadingBox.css"
import * as Y from "yjs";
import Editor from "@monaco-editor/react";
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
const socket = io('http://localhost:3003');


const Difficulty =[
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
  ]

function MatchingButton() {
     // whether or not to show the loading dialog
  const [isLoading, setIsLoading] = useState(false);

  // data to display
  const [loadedData, setLoadedData] = useState();

  // match is found
  const [isMatchFound, setIsMatchFound] = useState(false);

  // room ID
  const [room, setRoom] = useState("");

  // Editor Ref
  const editorRef = useRef(null);


  // this function will be called when the button get clicked
  const buttonHandler = async () => {
    // show the loading dialog
    setIsLoading(true);
  };

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleSubmission = (data) => {
        buttonHandler();
        console.log(data)
        console.log("submitting");
        socket.timeout(7000).emit("joinQueue", data.difficulty, (err) => {
            if(err) {
                setIsLoading(false);
                socket.emit("timeout", data.difficulty);
            }
        });
        console.log("supo");
    }
    socket.on("matchFound", (room, user1_id, user2_id) => {
        setRoom(room);
        console.log("Match found: " + room);
        setIsLoading(false)
        document.getElementById("matching").innerHTML = "Match found!: Room: " + room + " User1: " + user1_id + " User2: " + user2_id;
    });


    function handleMount(editor, monaco){
        console.log("mounted");
        editorRef.current = editor;
        // initializes yjs
        const doc = new Y.Doc();
        // connect
        const provider = new WebrtcProvider(room, doc);
        const type = doc.getText("monaco");
        // binding
        const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
    }

    return (
        <div>
            <div style={{ display: isLoading ? 'flex' : 'none' }} className='modal'>
                <div className='modal-content'>
                    <div className='loader'></div>
                    <div className='modal-text'>Matching...</div>
                </div>
            </div>
            {room && (
                <div className='collab'>
                    <Editor
                    height='50vh'
                    width='50vw'
                    theme='vs-dark'
                    onMount={handleMount}
                    />
                </div>
            )}
            <form onSubmit={handleSubmit(handleSubmission)}>
                <Grid xl={12} item>
                    <TextField sx={{ border: '2px solid white', bgcolor: "#FFFF",
                    '& .MuiInputBase-input': {
                        color: 'black', // Change this to your desired text color
                        textAlign: 'left',
                    },}}
                    select defaultValue="" label="Difficulty" name="Difficulty" placeholder="Medium" variant="filled" fullWidth required {...register("difficulty", { required: true })}>
                    {Difficulty.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))} </TextField>
                </Grid>
                <div className="MatchingButton">
                    <p style={{colors:'white'}} id="matching" label="Outlined" variant="outlined"></p>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Matching</Button>
                </div>
            </form>
        </div>
    );
}

export default MatchingButton;