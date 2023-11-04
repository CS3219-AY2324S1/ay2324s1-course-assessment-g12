import SubmitButton from '../components/SubmitButton';
import QuestionList from '../components/QuestionList';
import MatchingButton from '../components/MatchingButton';
//import MatchingPage from './MatchingPage';
import { TextField, colors } from '@mui/material';
import Navbar from '../components/Navbar';

function QuestionPage() {
  return (
    <div className="App">
      <header className="App-header">
        <SubmitButton />
        <QuestionList />
      </header>
    </div>
  );
}

export default QuestionPage;
