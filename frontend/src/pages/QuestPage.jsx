import React, { useState } from 'react';
import { FileUploader } from '../components/FileUploader';
import { useAuth } from '../components/AuthProvider';

// Toast Component
const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    const baseStyles = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      color: 'white',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      minWidth: '320px',
      animation: 'slideIn 0.3s ease-out',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px'
    };

    const typeColors = {
      success: { backgroundColor: '#10B981' },
      error: { backgroundColor: '#EF4444' },
      info: { backgroundColor: '#3B82F6' }
    };

    return { ...baseStyles, ...typeColors[type] };
  };

  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

  return (
    <div style={getToastStyles()}>
      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{icon}</span>
      <span style={{ flex: 1 }}>{message}</span>
      <button 
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          padding: '0 4px',
          opacity: 0.8
        }}
        onMouseEnter={(e) => e.target.style.opacity = '1'}
        onMouseLeave={(e) => e.target.style.opacity = '0.8'}
      >
        ×
      </button>
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <div style={{
      width: '16px',
      height: '16px',
      border: '2px solid transparent',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <span>Generating...</span>
  </div>
);

export const QuestPage = () => {
  const { selectedFile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const uploadFilesToBackend = async () => {
    // Validation
    if (!selectedFile || selectedFile.length < 2) {
      showToast('Please select both files first', 'error');
      return;
    }

    setIsLoading(true);
    showToast('Uploading files and generating question paper...', 'info');

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
        
        // Check if the response is actually a PDF
        if (blob.type !== 'application/pdf' && blob.size === 0) {
          throw new Error('Invalid response from server');
        }
        
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'question-paper.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        showToast('Question paper generated and downloaded successfully!', 'success');
      } else {
        // Handle different HTTP error codes
        const errorText = await response.text();
        let errorMessage = 'Failed to generate question paper';
        
        switch (response.status) {
          case 400:
            errorMessage = 'Invalid files provided. Please check your uploads.';
            break;
          case 413:
            errorMessage = 'Files are too large. Please use smaller files.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          case 503:
            errorMessage = 'Service temporarily unavailable. Please try again.';
            break;
          default:
            errorMessage = errorText || errorMessage;
        }
        
        showToast(errorMessage, 'error');
      }
    } catch (err) {
      console.error("Upload error:", err);
      
      let errorMessage = 'Something went wrong while generating the question paper.';
      
      // Handle different types of errors
      if (err.name === 'TypeError' || err.message.includes('fetch')) {
        errorMessage = 'Unable to connect to server. Please check your connection.';
      } else if (err.name === 'AbortError') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='quest-page'>
      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast} 
        />
      )}
      
      <div className='container1'>
        <h3 style={{ textAlign: 'center', marginTop: '5vh', color: 'White' }}> 
          File Uploading Area 
        </h3>
        <p style={{ color: 'yellow', fontSize: '1.2vw', textAlign: 'center' }}>
          Note: Include question paper pattern file also to generate appropriate paper.
        </p>
        <FileUploader />
        <button 
          className={`generate-button`}
          onClick={uploadFilesToBackend}
          disabled={isLoading}
          style={{
            opacity: isLoading ? 0.75 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.2s ease'
          }}
        >
          {isLoading ? <LoadingSpinner /> : 'Generate Question Paper'}
        </button>
      </div>
      <div className='container2'>
        <h3 style={{ 
          width: '100%', 
          textAlign: 'center', 
          color: 'White', 
          backgroundColor: 'black', 
          height: '20vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          {isLoading ? (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '16px' 
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                border: '2px solid transparent',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <span>Generating your question paper...</span>
            </div>
          ) : (
            'Your generated Question Paper will appear here.'
          )}
        </h3>
      </div>
      
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .generate-button:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};