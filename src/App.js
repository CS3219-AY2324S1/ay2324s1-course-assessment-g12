import logo from './logo.svg';
import './App.css';
import SubmitButton from './components/SubmitButton';
import QuestionList from './components/QuestionList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <SubmitButton />
       <QuestionList />
      </header>
    </div>
  );
}

export default App;
