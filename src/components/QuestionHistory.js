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

const questionURL = 'http://localhost:3005';

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
        const response = await axios.get(`${questionURL}/user/questions`, {
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

  // const fetchLikedQuestions = async (email) => {
  //   try {
  //     console.log(email)
  //     const response = await axios.get(`${questionURL}/questions/like`, {
  //       params: {
  //         'email': email
  //       },
  //     });
  //     setLikedQuestions(response.data);
  //     console.log("Liked questions: ")
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error fetching liked questions:', error);
  //   }
  // };

  const handleRowClick = async (question) => {
    setSelectedQuestion(question);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseCard = () => {
    setSelectedQuestion(null);
    document.body.style.overflow = 'auto';
  };

  // const handleLike = async (question) => {
  //   try {
     
  //     const isLiked = likedQuestions.length > 0 && likedQuestions.some(likedQuestion => likedQuestion.title === question.title)
    
  //     if (isLiked) {
  //       const updatedLikedQuestions = likedQuestions.filter((q) => q.title !== question.title);
  //       setLikedQuestions(updatedLikedQuestions);
  //     } else {
  //       setLikedQuestions([...likedQuestions, question]);
  //     }

  //     // Send a request to your server to update the likes
  //     const response = await axios.post(`${questionURL}/question/like`, {
  //       email: auth.currentUser.email,
  //       title: question.title,
  //       liked: !isLiked,
  //     });
  
  //     // Check if the request was successful (you may want to add more error handling)
  //     if (response.status === 200) {
  //       // Update the likes locally in the component
  //       const updatedQuestions = questions.map((q) =>
  //         q.title === question.title ? { ...q, visits: q.visits + (isLiked ? -1 : 1) } : q
  //       );
  //       setQuestions(updatedQuestions);
  //     } else {
  //       // Handle the case where the server request was not successful
  //       console.error('Failed to update likes');
  //     }
  //   } catch (error) {
  //     // Handle any errors that occur during the request
  //     console.error('Error updating likes:', error);
  //   }
  // };
  

  // Calculate the range of questions to display based on current page and questionsPerPage
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  return (
    <div>
      <div style={{ display: 'flex', textAlign:"left" }}>
        <div style={{ flex: 0.60 }}>Title</div>
        <div style={{ flex: 0.15 }}>Partner</div>
        <div style={{ flex: 0.16 }}>Difficulty</div>
        <div style={{ flex: 0.1 , textAlign:"center"}}>Done</div>
    </div>
      <div className='Scrollable-table-div'>
        <table className="table-container">
          {/* <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Title</th>
              <th style={{ textAlign: 'left' }}>Partner</th>
              <th style={{ textAlign: 'left' }}>Difficulty</th>
              <th style={{ textAlign: 'left' }}>Completed</th>
            </tr>
          </thead> */}
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
