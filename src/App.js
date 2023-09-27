import logo from './logo.svg';
import './App.css';
import SubmitButton from './components/SubmitButton';
import QuestionList from './components/QuestionList';
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import QuestionPage from './pages/QuestionPage';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <Routes>
          <Route index element={<QuestionPage />} />
          <Route path="/UserProfile" element={<UserProfile />} /> */ /* if want to add extra page  just copy and change the path
        </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
