import { useEffect } from 'react';
import SubmitButton from '../components/SubmitButton';
import { useNavigate } from 'react-router-dom';
import '../style/AddQuestionPage.css'; 

function AddQuestionPage() {
  const navigate = useNavigate();
  
  return (
    <div className="add-question-container">
      <header className="add-question-header">
        <SubmitButton />
      </header>
    </div>
  );
}

export default AddQuestionPage;
