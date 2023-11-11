import React from 'react';
import { useForm, reset } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CategoryMenuAdd from './CategoryMenuAdd';
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

const questionURL = 'http://localhost:3002';

function SubmitButton() {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const handleSubmission = async (data) => {
    const { title, content, categories, difficulty } = data;
    console.log(title, content, categories, difficulty);
  
    // Check if the "categories" field is empty
    if (!categories || categories.length === 0) {
      alert('Please fill out the Category field.');
      return;
    }
  
           try {
            // Check for duplicate title
            const duplicateCheckResponse = await axios.get(`${questionURL}/question`, {
            params: { title },
          });

          if (duplicateCheckResponse.status === 404) {
            console.log("help")
            // No question found, proceed with adding the question
            const response = await axios.post(`${questionURL}/question`, {
              title,
              categories,
              difficulty,
              content,
            });

          // Handle the success response here
          console.log('ADD Request Successful:', response.data);

          reset({
            title: "",
            content: "",
            categories: [],
            difficulty: ""
          });
        } else if (duplicateCheckResponse.status === 200) {
          // Question with the same title already exists
          alert('Question with the same title already exists. Please choose a different title.');
        } else {
          // Handle other cases or errors
          console.error('Unexpected response:', duplicateCheckResponse);
        }
      } catch (error) {
        // Handle errors here
        console.error('Error checking duplicate title:', error);

        if (error.response && error.response.status === 403) {
          // Handle 403 Forbidden error (permissions issue)
          alert('You do not have the required permissions to add questions.');
        }
      }
            /** just replace the rest of the function to test the commented code above */
    // // try {
    // //   const response = await axios.post(`${questionURL}/question`, {
    // //     title,
    // //     categories,
    // //     difficulty,
    // //     content,
    // // });
  
    // //   // Handle the success response here
    // //   console.log('ADD Request Successful:', response.data);
  
    // //   reset({
    // //     title: "",
    // //     content: "",
    // //     categories: [],
    // //     difficulty: ""
    // //   });
    // // } catch (error) {
    // //   // Handle errors here
    // //   console.error('ADD Request Error:', error);
  
    //   if (error.response && error.response.status === 403) {
    //     // Handle 403 Forbidden error (permissions issue)
    //     alert('You do not have the required permissions to add questions.');
    //   }
    // }
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
            <TextField sx={{ border: '2px solid white', bgcolor: "#ffff", input: { color: "black" } }} label="Description" name="Message" multiline
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
              select defaultValue="" label="Difficulty" name="Difficulty" placeholder="Medium" variant="filled" fullWidth required {...register("difficulty", { required: true })}>
              {Difficulty.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid xs={12} item>
            <CategoryMenuAdd
              selectedCategory={[]}
              onCategoryChange={(newCategories) => {
                // Set the new value to the "categories" form field
                setValue("categories", newCategories);
              }}
            />
          </Grid>
          <Grid xs={12} item>
            <Button type="submit" variant="contained" color="primary" fullWidth> Submit</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default SubmitButton;





