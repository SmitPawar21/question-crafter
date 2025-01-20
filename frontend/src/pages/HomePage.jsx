import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
    const navigate = useNavigate();

    const handleStart = ()=>{
        navigate('/main');
    }

  return (
    <div className='home-page'>
      {/* <Navbar /> */}

      <div className='hero'>
        <h2 style={{color:'white', fontSize:'5vw', marginTop:'20vh'}}>Welcome to Question Crafter</h2>
        <p style={{color:'white', fontSize:'1.5vw', width:'100%', padding:'5vh 5vw', textAlign:'center', marginTop:'2vh', backgroundColor:'#1D1616', boxSizing:'border-box'}}>This platform empowers educators and content creators to seamlessly generate question papers, quizzes, and practice sets from uploaded PDFs, images, or videos. Leveraging advanced AI technologies, it transforms your input into tailored assessments with customizable patterns, ensuring alignment with specific educational needs. Whether you're creating a structured exam, interactive quizzes, or personalized practice questions, this tool simplifies the process and enhances productivity. Ideal for teachers, trainers, and anyone looking to save time while maintaining high-quality content delivery.</p>

        <button onClick={handleStart}>Get Started</button>
      </div>
    </div>
  )
}
