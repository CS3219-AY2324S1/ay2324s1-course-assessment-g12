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
import AdminLayout from './pages/AdminLayout'; 
import Layout from './pages/Layout';
import LoginLayout from './pages/LoginLayout';
import AddQuestionPage from './pages/AddQuestionPage';
import AdminQuestionPage from './pages/AdminQuestionPage';
import CollaborationPage from './pages/CollaborationPage';
import LayoutHome from './pages/LayoutHome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LayoutHome/>} />
          <Route path ="/LoginPage" element={<LoginLayout><LoginPage /></LoginLayout>} />
          <Route path="/Home" element={<LayoutHome/>} /> 
          <Route path="/UserProfile" element={<Layout><UserProfilePage /> </Layout>} /> 
          <Route path="/Questions" element={<Layout><QuestionPage /> </Layout>} /> 
          <Route path="/AddQuestion" element={<AdminLayout><AddQuestionPage /> </AdminLayout>} /> 
          <Route path="/AdminQuestions" element={<AdminLayout><AdminQuestionPage /> </AdminLayout>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
