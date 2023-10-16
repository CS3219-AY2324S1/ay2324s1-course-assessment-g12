import SubmitButton from '../components/SubmitButton';
import QuestionList from '../components/QuestionList';
import MatchingButton from '../components/MatchingButton';
import { TextField, colors } from '@mui/material';
import TagMenu from '../components/TagMenu';
import LevelMenu from '../components/LevelMenu';
import { useState } from 'react';

function QuestionPage() {

  const [selectedTag, setSelectedTag] = useState('All Topics'); // Default value
  const [selectedLevel, setSelectedLevel] = useState('All Levels'); // Default value

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    console.log(tag);
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    console.log(level)
  };

  return (
    <div className="App">
      <header className="App-header">
        <div> 
        <TagMenu selectedTag={selectedTag} onTagChange={handleTagChange}/>
        <LevelMenu selectedLevel={selectedLevel} onLevelChange={handleLevelChange}/>
        </div>        
        <QuestionList selectedTag={selectedTag} selectedLevel={selectedLevel}/>
      </header>
    </div>
  );
}

export default QuestionPage;
