import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionCard from './QuestionCard';
import {auth} from '../firebase-config';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import '../style/QuestionHistory.css';
import QuestionCardHistory from './QuestionCardHistory';
import { databaseApi } from '../apis.js';

const databaseURL = databaseApi;

const QuestionHistory = ({ selectedCategory, selectedLevel, selectedList, userData }) => {
  const [questions, setQuestions] = useState([]);
  // const [likedQuestions, setLikedQuestions] = useState([]); 
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const questionsPerPage = 30; // Define the number of questions to display per page
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, you can access user data here
        // fetchLikedQuestions(user.email);
      } else {
        // User is signed out, you can handle this case here
        console.error('User is not authenticated.');
      }
    });

    return () => {
      // Unsubscribe from the listener when the component unmounts
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${databaseURL}/user/questions`, {
          params: {
            username: userData.username,
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [selectedCategory, selectedLevel, selectedList]);

  const handleRowClick = async (question) => {
    setSelectedQuestion(question);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseCard = () => {
    setSelectedQuestion(null);
    document.body.style.overflow = 'auto';
  };

  // Calculate the range of questions to display based on current page and questionsPerPage
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  return (
    <div>
      <div style={{ display: 'flex', textAlign:"left" }}>
        <div style={{ flex: 0.60, fontFamily:'Russo' }}>Questions Attempted</div>
        <div style={{ flex: 0.15, fontFamily:'Russo' }}>Partner</div>
        <div style={{ flex: 0.16, fontFamily:'Russo' }}>Difficulty</div>
        <div style={{ flex: 0.1, fontFamily:'Russo', textAlign:"center"}}>Done</div>
    </div>
      <div className='Scrollable-table-div'>
        <table className="table-container">
          <tbody>
            {currentQuestions.length > 0 ? (
              currentQuestions.map((question, index) => (
                <tr className="question-row" key={index}>
                  <td style={{ textAlign: 'left', width: '60%'  }} onClick={() => handleRowClick(question)}>
                    {question.title}
                  </td>
                  <td style={{ textAlign: 'left', width: '15%'  }}>{question.partner}</td>
                  <td style={{ textAlign: 'left', width: '15%'  }}>{question.difficulty}</td>
                  <td style={{ textAlign: 'center', width: '10%'  }}>{question.completed ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center' }}>
                  No questions available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {selectedQuestion && (
          <div className="modal-background">
            <QuestionCardHistory question={selectedQuestion} onClose={handleCloseCard}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionHistory;
