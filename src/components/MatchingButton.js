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
import { useState, useEffect } from 'react';
import "../style/LoadingBox.css"
import * as Y from "yjs";
import Editor from "@monaco-editor/react";
import { MonacoBinding } from 'y-monaco';
import * as monaco from 'monaco-editor';
import { createClient } from '@liveblocks/client';
import LiveblocksProvider from "@liveblocks/yjs";
const socket = io('http://localhost:3003');

const client = createClient({
    publicApiKey: "pk_dev_-iamGGIAHL-AOLUgx1XFpZ3yyHJXxO5cdT4mZ4ZBvSKb2-JF8vKSmdaj7UVE-M_a",
});

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
  const [roomJoined, setRoomJoined] = useState("");

  // Editor
  const [editor, setEditor] = useState(null);

    //chat log
    const [chatLog, setChatLog] = useState("");

    //user input message
  const [userMessage, setUserMessage] = useState("");

  // Yjs
  const ydoc = new Y.Doc();

  // Ytype
  const textType = ydoc.getText("monaco");

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
        setRoomJoined(room);
        console.log("Match found: " + room);
        setIsLoading(false)
        document.getElementById("matching").innerHTML = "Match found!: Room: " + room + " User1: " + user1_id + " User2: " + user2_id;

    });

    function handleSendMessage() {
        setUserMessage(userMessage+"\n")
        socket.emit("send-message", userMessage, socket.id, roomJoined)
    }

    socket.on("get-message", msg => {
        setChatLog(chatLog+msg)
        console.log(msg)
    })

    function handleOnMount(editor22, monaco22) {
        // Enter a multiplayer room
        const { room, leave } = client.enterRoom(roomJoined, {
            initialPresence: {},
        });

        console.log(room)
        console.log(leave)
        const yProvider = new LiveblocksProvider(room, ydoc);
        
        // // Set up the Monaco editor
        // const parent = document.querySelector('#editor');
        // const editor = monaco.editor.create(parent, {
        //     value: '',
        //     language: 'javascript',
        // });
        
        // console.log(parent)
        // console.log(editor)
        // Attach Yjs to Monaco
        const monacoBinding = new MonacoBinding(textType, editor22.getModel(), new Set([editor22]), yProvider.awareness);
    }


    return (
        <div>
            <div style={{ display: isLoading ? 'flex' : 'none' }} className='modal'>
                <div className='modal-content'>
                    <div className='loader'></div>
                    <div className='modal-text'>Matching...</div>
                </div>
            </div>
            {roomJoined && (
                <div id='editor'>
                    <div style={{ display: 'flex'}}>
                        <Editor 
                        height='50vh'
                        width='50vw'
                        theme='vs-dark'
                        onMount={handleOnMount}></Editor>
                    </div>
                </div>
            )}

            {/* Chat Box */}
          <div className="chat-box">
            <div className="chat-window">
              {chatLog}
            </div>
      
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>

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