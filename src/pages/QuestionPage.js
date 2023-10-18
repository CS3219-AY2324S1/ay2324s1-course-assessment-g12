import SubmitButton from '../components/SubmitButton';
import QuestionList from '../components/QuestionList';
import MatchingButton from '../components/MatchingButton';
import { TextField, colors } from '@mui/material';
import CategoryMenu from '../components/CategoryMenu';
import LevelMenu from '../components/LevelMenu';
import { useState } from 'react';

function QuestionPage() {

  const [selectedCategory, setSelectedCategory] = useState('All Topics'); // Default value
  const [selectedLevel, setSelectedLevel] = useState('All Levels'); // Default value

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    console.log(category);
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    console.log(level)
  };

  return (
    <div className="App">
      <header className="App-header">
        <div> 
        <CategoryMenu selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange}/>
        <LevelMenu selectedLevel={selectedLevel} onLevelChange={handleLevelChange}/>
        </div>        
        <QuestionList selectedCategory={selectedCategory} selectedLevel={selectedLevel}/>
      </header>
    </div>
  );
}

export default QuestionPage;
