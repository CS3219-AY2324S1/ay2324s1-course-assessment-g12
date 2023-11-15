import React from 'react';
import LoginSignup from '../components/LoginSignup'; 
import  io  from 'socket.io-client';
import { set } from 'react-hook-form';

const socket = io('http://35.198.205.80/match');

function MatchingPage() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [difficulty, setDifficulty] = React.useState(null);
  const [isMatching, setIsMatching] = React.useState(false);
  const [isMatchFound, setIsMatchFound] = React.useState(false);

  React.useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      setIsMatching(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("matchFound", (room, user1_id, user2_id) => {
      console.log("Match found: " + room);
      displayMessage("Match found!:" + room.id);
      setIsMatching(false);
      setIsMatchFound(true);
    });
  }, [difficulty]);

  const handleSubmit = (data) => {
    setDifficulty(data.difficulty);
    socket.emit("joinQueue", data.difficulty);
  }

  const handleCancel = () => {
    setIsMatching(false);
    socket.emit("cancelQueue", difficulty);
  }

  const handleRenew = () => {
    setIsMatching(true);
    socket.emit("renew", difficulty);
  }

  return (
    <div className="matching-page">
      <LoginSignup socket={socket} />
    </div>
  );
  
}

export default MatchingPage;