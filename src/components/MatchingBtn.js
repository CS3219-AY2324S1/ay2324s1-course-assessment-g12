import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Card, CardContent } from '@mui/material';

const Difficulty = [
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Hard', label: 'Hard' },
];

function MatchingBtn({ callback, socket, setRoomJoined }) {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30); // Set your initial countdown value here

  const buttonHandler = () => {
    setIsLoading(true);
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleSubmission = (data) => {
    buttonHandler();
    console.log(data);
    console.log("submitting");
    socket.timeout(30000).emit("joinQueue", data.difficulty, (err) => {
      if (err) {
        setIsLoading(false);
        socket.emit("timeout", data.difficulty);
      }
    });
  };

  useEffect(() => {
    let countdownInterval;

    if (isLoading) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setCountdown(30); // Reset countdown when not loading
      clearInterval(countdownInterval);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [isLoading]);

  useEffect(() => {
    if (countdown === 0) {
      setIsLoading(false);
    }
  }, [countdown]);

  socket.on("matchFound", (room, user1_id, user2_id) => {
    setRoomJoined(room);
    setIsLoading(false);
    callback(true);
  });

  return (
    <div class="parent-container">
      <div style={{ display: isLoading ? 'flex' : 'none' }} className='modal'>
        <div className='modal-content'>
          <div className='loader'></div>
          <div className='modal-text'>
            {isLoading ? `Matching... ${countdown}s` : 'Match Found!'}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleSubmission)}>
        <Card variant="outlined" sx={{ border: '2px solid black', bgcolor: "black" }}>
          <CardContent>
            <Grid xl={12} item>
              <TextField
                sx={{
                  border: '2px solid white',
                  bgcolor: "#FFFF",
                  '& .MuiInputBase-input': {
                    color: 'black',
                    textAlign: 'left',
                  },
                }}
                select
                defaultValue=""
                label="Difficulty"
                name="Difficulty"
                placeholder="Medium"
                variant="filled"
                fullWidth
                required
                {...register("difficulty", { required: true })}
              >
                {Difficulty.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <div className="MatchingButton">
              <Button type="submit" variant="contained" color="primary" fullWidth>Matching</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default MatchingBtn;