import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandText, setExpandText] = useState("Expand");

  useEffect(() => {
    const id_key = "id";
    const id = JSON.parse(localStorage.getItem(id_key));
    if (id) {
      const items = { ...localStorage };
      const questionArray = [];

      for (const key in items) {
        if (key !== id_key) {
          const parsedItem = JSON.parse(items[key]);
          questionArray.push(parsedItem);
        }
      }

      setQuestions(questionArray);
    }
  }, []);

  const handleExpandClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
    setExpandText(expandText === "Expand" ? "Collapse" : "Expand");
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
                {expandText}
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
