import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import {deleteQuestions} from "./LocalStorageHandler.js"

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  //const [expandText, setExpandText] = useState("Expand");
  //Rather than storing 1 String for all button, each button got a state to store
  const [expandState, setExpandState] = useState([]);
  const [curr, setCurr] = useState(-1);

  useEffect(() => {
    const id_key = "id";
    const id = JSON.parse(localStorage.getItem(id_key));
    if (id) {
      const items = { ...localStorage };
      const questionArray = [];
      const expandState = [];

      for (const key in items) {
        if (key !== id_key) {
          const parsedItem = JSON.parse(items[key]);
          questionArray.push(parsedItem);
          expandState.push("Expand");
        }
      }
      setExpandState(expandState);
      setQuestions(questionArray);
    }
  }, []);

  const handleExpandClick = (index) => {
    const isSameIndex = index === curr;
    const newExpandState = expandState;
    
    if (isSameIndex) {
      newExpandState[index] = expandState[index] === "Expand" ? "Collapse" : "Expand";
    } else {
      newExpandState[curr] = "Expand";
      newExpandState[index] = "Collapse";
      setCurr(index);
    }
  
    setExpandedCard(expandedCard === index ? null : index);
    //setExpandText(newExpandState[index] === "Expand" ? "Collapse" : "Expand");
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
                onClick={() => {
                  deleteQuestions(question.title);
                  window.location.reload();
                }}
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
