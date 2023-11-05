import React from 'react';
import { useForm, reset } from 'react-hook-form';
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


const Categories = [
  { value: 'Algorithm', label: 'Algorithm' },
  { value: 'Data Structure', label: 'Data Structure' },
  { value: 'Database', label: 'Database' },
  { value: 'Operating System', label: 'Operating System' },
  { value: 'Network', label: 'Network' },
]
const Difficulty = [
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Hard', label: 'Hard' },
]

const questionURL = 'http://35.198.205.80';
const authHeader = {
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
}

function SubmitButton() {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleSubmission = async (data) => {
    const { title, content, categories, difficulty } = data;
    console.log(title, content, categories, difficulty);

    try {
      const response = await axios.post(`${questionURL}/question`, {
        "title": title,
        "categories": categories,
        "difficulty": difficulty,
        "content": content,
      }, { headers: authHeader }).then(response => {
        // Handle the success response here
        console.log('ADD Request Successful:', response.data);
      })
      .catch(error => {
        // Handle errors here
        console.error('ADD Request Error:', error);

        if (error.response && error.response.status === 403) {
          // Handle 403 Forbidden error (permissions issue)
          alert('You do not have the required permissions to add questions.');
        }
      });
      reset({
        title: "",
        content: "",
        categories: "",
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
            <TextField sx={{ border: '2px solid white', bgcolor: "#ffff", input: { color: "black" } }} label="Title" name="Questions" placeholder="Enter your Title" variant="filled" fullWidth required {...register("title", { required: true })} />
          </Grid>
          <Grid xs={12} item>
            <TextField sx={{ border: '2px solid white', bgcolor: "#ffff", input: { color: "black" } }} label="Decription" name="Message" multiline
              placeholder="Enter Question Content (in html)" variant="filled" fullWidth {...register("content", { required: true })} />
          </Grid>
          <Grid xs={12} item>
            <TextField sx={{
              border: '2px solid white', bgcolor: "#FFFF",
              '& .MuiInputBase-input': {
                color: 'black', // Change this to your desired text color
                textAlign: 'left',
              },
            }}
              select defaultValue="" label="Categories" name="Categories" placeholder="Algorithm" variant="filled" fullWidth required {...register("categories", { required: true })}>
              {Categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))} </TextField>
          </Grid>
          <Grid xs={12} item>
            <TextField sx={{
              border: '2px solid white', bgcolor: "#FFFF",
              '& .MuiInputBase-input': {
                color: 'black', // Change this to your desired text color
                textAlign: 'left',
              },
            }}
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
      </form >
    </div>

  );
}

export default SubmitButton;