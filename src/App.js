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
import LoginPage from './pages/LoginPage'
import QuestionPage from './pages/QuestionPage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <Routes>
          <Route index element={<QuestionPage />} />
          <Route path ="/LoginPage" element={<LoginPage />} />
          <Route path="/UserProfile" element={<UserProfilePage />} /> */ /* if want to add extra page  just copy and change the path
        </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
