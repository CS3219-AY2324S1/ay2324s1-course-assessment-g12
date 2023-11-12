import React, { useState } from 'react';
import '../style/QuestionPage.css';
import '../style/QuestionCard.css';
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

const questionUrl = 'http://localhost:3002';

const QuestionCard = ({ question, onClose }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(question.content);

  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };

  const getDifficultyClass = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'difficulty-easy';
      case 'medium':
        return 'difficulty-medium';
      case 'hard':
        return 'difficulty-hard';
      default:
        return '';
    }
  };

  const handleEditClick = () => {
    setEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    // Save the edited content
    console.log(editedContent);
    try {
      const response = await axios.patch(`${questionUrl}/question`, {
        title: question.title,
        data: { content: editedContent },
      });

      // Handle the success response here
      console.log('EDIT Request Successful:', response.data);
    } catch (error) {
      // Handle errors here
      console.error('EDIT Request Error:', error);

      if (error.response && error.response.status === 403) {
        // Handle 403 Forbidden error (permissions issue)
        alert('You do not have the required permissions to edit the question.');
      } else {
        // Handle other errors or display a generic error message
        alert('An error occurred while saving the edited content. Please try again.');
      }
    }

    setEditing(false);
  };

  const handleContentChange = (event) => {
    setEditedContent(event.target.value);
  };

  return (
    <div className="question-card">
      <div className="card-header">
        <h1>{question.title}</h1>
        <button onClick={onClose} className="close-button">
          CLOSE
        </button>
      </div>
      <div className="card-content">
        <div className='tag-div'>
          {question.categories.map((category, index) => (
            <div key={index}>{category}</div>
          ))}
        </div>
        <p className={getDifficultyClass(question.difficulty)}>
          {question.difficulty}
        </p>
        <div className="card-actions">
          {isEditing ? (
            <button onClick={handleSaveClick} className="save-button-card">
              SAVE
            </button>
          ) : (
            <button onClick={handleEditClick} className="edit-button-card">
              EDIT
            </button>
          )}
        </div>
        {isEditing ? (
          <textarea
          value={editedContent}
          onChange={handleContentChange}
          className="edit-textarea"
          style={{ minHeight: '40vh', minWidth: '100vh' }} // Adjust the height as needed
        />
        ) : (
          <div className='content-div' dangerouslySetInnerHTML={createMarkup(editedContent)} />
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
