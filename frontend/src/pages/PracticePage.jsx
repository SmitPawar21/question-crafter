import React, { useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { FileUploader } from '../components/FileUploader';

export const PracticePage = () => {

    const selectedFile = useAuth();
    const [number, setNumber] = useState(0);

    const handleNumber = (e)=>{
        setNumber(e.target.value);
    }

    const handleGenerate = ()=>{
        // FETCH POST - selected file, number 
    }

    return (
        <div className='quest-page'>
            <div className='container1'>
                <h3 style={{ textAlign: 'center', marginTop: '5vh', color: 'White' }}> File Uploading Area </h3>
                <FileUploader />

                <div>
                    <div>
                        <p style={{
                            color: 'white', position: 'absolute',
                            bottom: '70px',
                            left: '5%'
                        }}>No. of Questions</p>

                        <input type='number' className='input-field' onChange={handleNumber} />
                    </div>
                    <button style={{ width: '60%', fontSize: '1.6vw', left: '30%' }} className='generate-button' onClick={handleGenerate}>Generate Practice Questions</button>
                </div>
            </div>
            <div className='container2'>
                <h3 style={{ width: '100%', textAlign: 'center', color: 'White', backgroundColor: 'black', height: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Practice Questions will generate here.</h3>
            </div>
        </div>
    )
}

