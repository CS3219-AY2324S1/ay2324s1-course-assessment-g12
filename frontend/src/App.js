import './App.css';
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
import HomePage from './pages/HomePage';
import Layout from './pages/Layout';
import AddQuestionPage from './pages/AddQuestionPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Layout> <HomePage /> </Layout>} />
          <Route path ="/Page/LoginPage" element={<LoginPage />} />
          <Route path="/Page/Home" element={<Layout><HomePage /> </Layout>} /> 
          <Route path="/Page/UserProfile" element={<Layout><UserProfilePage /> </Layout>} /> 
          <Route path="/Page/Questions" element={<Layout><QuestionPage /> </Layout>} /> 
          <Route path="/Page/AddQuestion" element={<Layout><AddQuestionPage /> </Layout>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;