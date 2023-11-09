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
<<<<<<< HEAD:frontend/src/App.js
import "dotenv/config"
=======
import AdminQuestionPage from './pages/AdminQuestionPage';
>>>>>>> 2cf342fbaa3172cb882cd5dc57216e08bd930d9b:src/App.js

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Layout> <HomePage /> </Layout>} />
<<<<<<< HEAD:frontend/src/App.js
          <Route path ="/Page/LoginPage" element={<LoginPage />} />
          <Route path="/Page/Home" element={<Layout><HomePage /> </Layout>} /> 
          <Route path="/Page/UserProfile" element={<Layout><UserProfilePage /> </Layout>} /> 
          <Route path="/Page/Questions" element={<Layout><QuestionPage /> </Layout>} /> 
          <Route path="/Page/AddQuestion" element={<Layout><AddQuestionPage /> </Layout>} /> 
=======
          <Route path ="/LoginPage" element={<LoginPage />} />
          <Route path="/Home" element={<Layout><HomePage /> </Layout>} /> 
          <Route path="/UserProfile" element={<Layout><UserProfilePage /> </Layout>} /> 
          <Route path="/Questions" element={<Layout><QuestionPage /> </Layout>} /> 
          <Route path="/AddQuestion" element={<Layout><AddQuestionPage /> </Layout>} /> 
          <Route path="/AdminQuestions" element={<Layout><AdminQuestionPage /> </Layout>} />
>>>>>>> 2cf342fbaa3172cb882cd5dc57216e08bd930d9b:src/App.js
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
