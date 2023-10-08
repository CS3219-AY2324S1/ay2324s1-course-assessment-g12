import React from 'react';
import { useForm } from 'react-hook-form';
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
import {postQuestion} from "./LocalStorageHandler.js"


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

const questionURL = 'http://localhost:3002';

function SubmitButton() {
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const handleSubmission = async (data) => {
    const { title, description, category, difficulty } = data;
    console.log(title, description, category, difficulty);

    try {
      const response = await axios.post(`${questionURL}/question`, {
        "title": title,
        "category": category,
        "difficulty": difficulty,
        "description": description,
      });
      console.log(response.data);
      reset({
      title: "",
      description: "",
      category: "",
      difficulty: ""
    });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="wrapper_submit">
        <h1> Submit your questions here:</h1>
        <form onSubmit={handleSubmit(handleSubmission)}>
        <Grid container spacing={1}>
              <Grid xs={12} item>
                <TextField sx={{ border: '2px solid white', bgcolor: "#ffff", input: { color: "black" }}} label="Title" name="Questions" placeholder="Enter your Title" variant="filled" fullWidth required {...register("title", { required: true })}/>
              </Grid>
              <Grid xs={12} item>
                <TextField sx={{ border: '2px solid white', bgcolor: "#ffff", input: { color: "black" } }} label="Decription" name="Message" multiline
                   placeholder="Enter Description" variant="filled" fullWidth {...register("description", { required: true })}/>
              </Grid>
              <Grid xs={12} item>
                <TextField sx={{ border: '2px solid white', bgcolor: "#FFFF",
                '& .MuiInputBase-input': {
                    color: 'black', // Change this to your desired text color
                    textAlign: 'left',
                  },}}
                  select defaultValue="" label="Category" name="Category" placeholder="Algorithm" variant="filled" fullWidth required {...register("category", { required: true })}>
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
                  select defaultValue="" label="Difficulty" name="Difficulty" placeholder="Medium" variant="filled" fullWidth required {...register("difficulty", { required: true })}>
                  {Difficulty.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))} </TextField>
              </Grid>
              <Grid xs={12} item>
                <Button type="submit" variant="contained" color="primary" fullWidth> Submit</Button>
              </Grid>
              {/* <Grid xs={12} item>
                <Button type="reset" variant="contained" color="primary" fullWidth> Reset form</Button>
              </Grid> */}
        </Grid >
        </form>
    </div>
    
  );
}

export default SubmitButton;