import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionCard from './QuestionCard';  // Make sure to import the QuestionCard component

const questionURL = 'http://localhost:3002';

const QuestionList = (category, level, list) => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    
    const fetchQuestions = async () => {
      try {
        //const response = await axios.get(`${questionURL}/questions/filter`, {params: {'categories': category, 
         //                                                                            'difficulty': level, 
          //                                                                           'limit': list}}); 
       // setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleRowClick = async (question) => {
    setSelectedQuestion(question);
    const response = await axios.patch(`${questionURL}/question/visit`, {title: question.title}); 
    document.body.style.overflow = "hidden";
  };

  const handleCloseCard = () => {
    setSelectedQuestion(null);
    document.body.style.overflow = "auto"; 
  };

  return (
    <div>
      <table className="table-container">
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Title</th>
            <th style={{ textAlign: 'left' }}>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr
              className='question-row'
              key={index}
              onClick={() => handleRowClick(question)}
            >
              <td style={{ textAlign: 'left' }}>{question.title}</td>
              <td style={{ textAlign: 'left' }}>{question.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedQuestion && (
        <div className="modal-background">
          <QuestionCard
            question={selectedQuestion}
            onClose={handleCloseCard}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionList;