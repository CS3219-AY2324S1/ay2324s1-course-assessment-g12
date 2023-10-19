import React from 'react';
import '../style/QuestionPage.css';
import '../style/QuestionCard.css'; 

const QuestionCard = ({ question, onClose }) => {

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
          
        <div className='content-div' dangerouslySetInnerHTML={createMarkup(question.content)} />
      </div>
    </div>
  );
};

export default QuestionCard;
