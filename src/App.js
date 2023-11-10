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
import Layout from './pages/Layout';
import AddQuestionPage from './pages/AddQuestionPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Layout> <QuestionPage /> </Layout>} />
          <Route path ="/LoginPage" element={<LoginPage />}/>
          <Route path="/UserProfile" element={<Layout><UserProfilePage /> </Layout>} /> 
          <Route path="/Questions" element={<Layout><QuestionPage /> </Layout>} /> 
          <Route path="/AddQuestion" element={<Layout><AddQuestionPage /> </Layout>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
