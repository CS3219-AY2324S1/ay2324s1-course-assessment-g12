import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import "../style/SubmitButton.css";

const Categories = [
  { value: 'Algorithm', label: 'Algorithm' },
  { value: 'Data Structure', label: 'Data Structure' },
  { value: 'Database', label: 'Database' },
  { value: 'Operating System', label: 'Operating System' },
  { value: 'Network', label: 'Network' },
]
const Difficulty =[
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Hard', label: 'Hard' },
]

function SubmitButton() {
  return (
    <div className="wrapper_submit">
        <h1> Submit your questions here:</h1>
        <form>
        <Grid container spacing={1}>
              <Grid xs={12} item>
                <TextField sx={{ border: '2px solid white', bgcolor: "#ffff", input: { color: "black" }}} label="Title" name="Questions" placeholder="Enter your Title" variant="filled" fullWidth required />
              </Grid>
              <Grid xs={12} item>
                <TextField sx={{ border: '2px solid white', bgcolor: "#ffff", input: { color: "black" } }} label="Decription" name="Message" multiline
                   placeholder="Enter Description" variant="filled" fullWidth />
              </Grid>
              <Grid xs={12} item>
                <TextField sx={{ border: '2px solid white', bgcolor: "#FFFF",
                '& .MuiInputBase-input': {
                    color: 'black', // Change this to your desired text color
                    textAlign: 'left',
                  },}}
                  select defaultValue="" label="Category" name="Category" placeholder="Algorithm" variant="filled" fullWidth required>
                  {Categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))} </TextField>
              </Grid>
              <Grid xs={12} item>
                <TextField sx={{ border: '2px solid white', bgcolor: "#FFFF",
                '& .MuiInputBase-input': {
                    color: 'black', // Change this to your desired text color
                    textAlign: 'left',
                  },}}
                  select defaultValue="" label="Difficulty" name="Difficulty" placeholder="Medium" variant="filled" fullWidth required>
                  {Difficulty.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))} </TextField>
              </Grid>
              <Grid xs={12} item>
                <Button type="submit" variant="contained" color="primary" fullWidth> Submit</Button>
              </Grid>
        </Grid >
            {/* <label>
                <p> Questions?</p>
                <input type="text" name="question" />
                <input type="text" name="question" />
                <input type="text" name="question" />
                <input type="text" name="question" />
            </label>
            <button type="submit">Submit</button> */}
        </form>
    </div>
    
  );
}

export default SubmitButton;