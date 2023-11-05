import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionCard from './QuestionCard';

const questionURL = 'http://localhost:3002';

const QuestionList = ({ selectedCategory, selectedLevel, selectedList }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const questionsPerPage = 30; // Define the number of questions to display per page

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        
        const response = await axios.get(`${questionURL}/questions/filter`, {
          params: {
            categories: selectedCategory,
            difficulty: selectedLevel,
            limit: selectedList,
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
    const response = await axios.post(`${questionURL}/question/visit`, {
      title: question.title,
    });
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
      <table className="table-container">
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Title</th>
            <th style={{ textAlign: 'left' }}>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {currentQuestions.length > 0 ? (
            currentQuestions.map((question, index) => (
              <tr
                className="question-row"
                key={index}
                onClick={() => handleRowClick(question)}
              >
                <td style={{ textAlign: 'left' }}>{question.title}</td>
                <td style={{ textAlign: 'left' }}>{question.difficulty}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                No questions available
              </td>
            </tr>
          )}
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

      {/* Pagination controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastQuestion >= questions.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionList;
