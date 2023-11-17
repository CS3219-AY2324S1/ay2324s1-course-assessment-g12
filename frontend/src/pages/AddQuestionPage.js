import { useEffect } from 'react';
import SubmitButton from '../components/SubmitButton';
import { useNavigate } from 'react-router-dom';

function AddQuestionPage() {
  const navigate = useNavigate();
  
  return (
    <div className="App">
      <header className="App-header">
        <SubmitButton />
      </header>
    </div>
  );
}

export default AddQuestionPage;
