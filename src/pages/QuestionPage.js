import SubmitButton from '../components/SubmitButton';
import QuestionList from '../components/QuestionList';

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
