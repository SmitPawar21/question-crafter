import React from 'react';
import { FileUploader } from '../components/FileUploader';
import { useAuth } from '../components/AuthProvider';

export const QuestPage = () => {
  const { selectedFile } = useAuth();

  const uploadFilesToBackend = async () => {
    if (!selectedFile || selectedFile.length < 2) {
      console.error('Please select both files first');
      return;
    }

    const formData = new FormData(); 
    formData.append('file1', selectedFile[0]);
    formData.append('file2', selectedFile[1]);

    try {
      const response = await fetch('http://localhost:5000/questionpaper', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'question-paper.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to upload question papers');
      }
    } catch (err) {
      console.error("Something went wrong while uploading files to the Backend. ", err);
    }
  };

  return (
    <div className='quest-page'>
      <div className='container1'>
        <h3 style={{ textAlign: 'center', marginTop: '5vh', color: 'White' }}> 
          File Uploading Area 
        </h3>
        <p style={{ color: 'yellow', fontSize: '1.2vw', textAlign: 'center' }}>
          Note: Include question paper pattern file also to generate appropriate paper.
        </p>
        <FileUploader />
        <button className='generate-button' onClick={uploadFilesToBackend}>
          Generate Question Paper
        </button>
      </div>
      <div className='container2'>
        <h3 style={{ width: '100%', textAlign: 'center', color: 'White', backgroundColor: 'black', height: '20vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Your generated Question Paper will appear here.
        </h3>
      </div>
    </div>
  );
};