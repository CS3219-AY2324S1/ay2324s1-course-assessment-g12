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
import CollaborationPage from './pages/CollaborationPage';
import AddQuestionPage from './pages/AddQuestionPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Layout> <HomePage /> </Layout>} />
          <Route path ="/LoginPage" element={<LoginPage />} />
          <Route path="/Home" element={<Layout><HomePage /> </Layout>} /> 
          <Route path="/UserProfile" element={<Layout><UserProfilePage /> </Layout>} /> 
          <Route path="/Questions" element={<Layout><QuestionPage /> </Layout>} /> 
          <Route path="/AddQuestion" element={<Layout><AddQuestionPage /> </Layout>} /> 
          <Route path="/CollaborationPage" element={<Layout><CollaborationPage /> </Layout>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
