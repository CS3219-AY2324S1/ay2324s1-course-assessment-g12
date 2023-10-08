import SubmitButton from '../components/SubmitButton';
import QuestionList from '../components/QuestionList';
import '../style/QuestionPage.css';

function QuestionPage() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="wrapper">
       <SubmitButton />
       </div>
       <QuestionList />
      </header>
    </div>
  );
}

export default QuestionPage;
