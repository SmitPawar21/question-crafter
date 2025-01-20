import React from 'react'
import { FileUploader } from '../components/FileUploader'

export const QuizPage = () => {
    return (
        <div className='quest-page'>
            <div className='container1'>
                <h3 style={{ textAlign: 'center', marginTop: '5vh', color: 'White' }}> File Uploading Area </h3>
                <FileUploader />

                <button className='generate-button'>Generate Quiz</button>
            </div>
            <div className='container2'>
                <h3 style={{ width: '100%', textAlign: 'center', color: 'White', backgroundColor: 'black', height: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Quiz section</h3>

                <p style={{ width: '100%', textAlign: 'center', color: 'black', backgroundColor: '#E7D283', padding: '1vh 0vw', fontWeight: '500' }}>Note: 10pts for Correct answer, -2pts for Incorrect and 0 if skipped</p>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', marginTop: '2vh' }}>
                    <h4>Question: 1/5</h4>
                    <h4>Score: 0</h4>
                </div>

                <div style={{ backgroundColor: '#543A14', width: '90%', height: '60%', marginTop: '5vh', padding: '1vh', boxSizing: 'border-box', color: '#FFF0DC' }} className='quiz-card'>
                    <div className='question'>
                        Question: <br />
                        hello cutie
                    </div>
                    <div className='options'>
                        <div className='option'>Option A: </div>
                        <div className='option'>Option B: </div>
                        <div className='option'>Option C: </div>
                        <div className='option'>Option D: </div>
                    </div>
                    <div style={{width:'100%', display:'flex', justifyContent:'right', padding:'0vh 1vw', boxSizing:'border-box'}}>
                        <button style={{ width: '30%', padding: '2vh 1vw', backgroundColor: '#F0BB78', border: '1px solid black', outline: 'none', color: 'black', fontSize: '1.5vw', fontWeight: '300', marginTop: '2vh', cursor: 'pointer' }} >Skip</button>
                    </div>

                </div>

            </div>
        </div>
    )
}
