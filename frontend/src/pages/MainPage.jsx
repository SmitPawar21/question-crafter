import React from 'react';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {

  const navigate = useNavigate();

  const handleQuest = ()=>{
    navigate('/quest');
  }

  const handlePractice = ()=>{
    navigate('/practice');
  }

  const handleQuiz = ()=>{
    navigate('/quiz');
  }
  
  return (
    <div className='main-page'>
        <div className='container cont1' onClick={handleQuest}>
            <h2>Generate Question Papers</h2>
        </div>
        <div className='container cont2' onClick={handleQuiz}>
            <h2>Generate Quiz With Flashcards</h2>
        </div>
        <div className='container cont3' onClick={handlePractice}>
            <h2>Generate Practice Questions</h2>
        </div>
    </div>
  )
}

