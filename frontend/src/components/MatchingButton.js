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
const socket = io('http://localhost:3003');


const Difficulty =[
    { value: 'Easy', label: 'Easy' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Hard', label: 'Hard' },
  ]

function MatchingButton() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleSubmission = (data) => {
        console.log(data)
        console.log("submitting");
        socket.emit("joinQueue", data.difficulty);
        document.getElementById("matching").innerHTML = "Matching...";
        console.log("supo");
    }
    
    socket.on("matchFound", (room, user1_id, user2_id) => {
        console.log("Match found: " + room);
        document.getElementById("matching").innerHTML = "Match found!: Room: " + room + " User1: " + user1_id + " User2: " + user2_id;
    });


    return (
        <div>
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