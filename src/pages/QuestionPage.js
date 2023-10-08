import SubmitButton from '../components/SubmitButton';
import QuestionList from '../components/QuestionList';
//import MatchingPage from './MatchingPage';
import  io  from 'socket.io-client';
import { TextField, colors } from '@mui/material';

const socket = io('http://localhost:3003');

function QuestionPage() {
  const handleSubmit = () => {
    console.log("submitting");
    socket.emit("joinQueue", "Easy");
    document.getElementById("matching").innerHTML = "Matching...";
    console.log("supo");
  }

  socket.on("matchFound", (room, user1_id, user2_id) => {
    console.log("Match found: " + room);
    document.getElementById("matching").innerHTML = "Match found!: Room: " + room + " User1: " + user1_id + " User2: " + user2_id;
  });

  return (
    <div className="App">
      <header className="App-header">
        <p style={{colors:'white'}} id="matching" label="Outlined" variant="outlined">

        </p>
        <button onClick={() => handleSubmit()}>MATCHING</button>
       <SubmitButton />
       <QuestionList />
      </header>
    </div>
  );
}

export default QuestionPage;
