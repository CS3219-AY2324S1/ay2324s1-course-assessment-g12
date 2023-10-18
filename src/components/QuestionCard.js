import React from 'react';

const QuestionCard = ({ question, onClose }) => {

    console.log(question.category); 

  return (
    <div className="question-card">
      <div className="card-header">
        <h1>{question.title}</h1>
        <button onClick={onClose} className="close-button">
          CLOSE
        </button>
      </div>
      <div className="card-content">
        <p>Category: {question.category}</p>
        <p>Difficulty: {question.difficulty}</p>
        <p>Description: {question.description}</p>
      </div>
    </div>
  );
};

export default QuestionCard;
