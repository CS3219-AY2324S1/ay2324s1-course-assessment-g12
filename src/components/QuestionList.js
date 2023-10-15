import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import axios from "axios";

const questionURL = 'http://localhost:3002';
const authHeader = {
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
}

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandState, setExpandState] = useState([]);
  const [curr, setCurr] = useState(-1);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${questionURL}/questions`);
        const questionArray = response.data;
        const expandState = Array(questionArray.length).fill("Expand");
        setExpandState(expandState);
        setQuestions(questionArray);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const deleteQuestion = async (title) => {
    try {
      const response = await axios.delete(`${questionURL}/question`, {
        params: { title: title },
        headers: authHeader,
      })
        .then(response => {
          // Handle the success response here
          console.log('DELETE Request Successful:', response.data);
        })
        .catch(error => {
          // Handle errors here
          console.error('DELETE Request Error:', error);

          if (error.response && error.response.status === 403) {
            // Handle 403 Forbidden error (permissions issue)
            alert('You do not have the required permissions to delete questions.');
          }
        });
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.title !== title)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleExpandClick = (index) => {
    const isSameIndex = index === curr;
    const newExpandState = [...expandState];

    if (isSameIndex) {
      newExpandState[index] = expandState[index] === "Expand" ? "Collapse" : "Expand";
    } else {
      newExpandState[curr] = "Expand";
      newExpandState[index] = "Collapse";
      setCurr(index);
    }

    setExpandedCard(expandedCard === index ? null : index);
    setExpandState(newExpandState);
  };

  return (
    <div>
      <h1>Questions</h1>
      <div>
        {questions.map((question, index) => (
          <Card key={index} style={{ margin: "10px 0" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {question.title}
              </Typography>
              <button
                onClick={() => handleExpandClick(index)}
                aria-expanded={expandedCard === index}
                aria-label="show more"
              >
                {expandState[index]}
              </button>
              <button
                onClick={() => { deleteQuestion(question.title) }}
              >
                Delete
              </button>
              <Collapse in={expandedCard === index}>
                <List>
                  <ListItem>
                    <ListItemText primary={`Description: ${question.description}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Category: ${question.category}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Difficulty: ${question.difficulty}`} />
                  </ListItem>
                </List>
              </Collapse>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default QuestionList;
