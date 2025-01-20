import React, { useState, useRef, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { useLocation } from 'react-router-dom';

export const FileUploader = () => {

  const location = useLocation();

  const {manageFile} = useAuth();

  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const clearFiles = () => {
    manageFile([]);
  };

  useEffect(() => {
    clearFiles(); 
  }, [location.pathname]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = [...e.dataTransfer.files];
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = [...e.target.files];
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => {
      const isValid = file.type === 'application/pdf' || file.type.startsWith('image/');
      return isValid;
    });

    setFiles(prev => [...prev, ...validFiles]);
    manageFile(validFiles);
  };

  const removeFile = (index) => {
    setFiles(prev => {
      const updatedFiles = prev.filter((_, i) => i !== index);
      manageFile(updatedFiles); 
      return updatedFiles;
    });
  };

  return (
    <div className="file-upload-container">
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept=".pdf,image/*"
          multiple
          className="file-input"
        />
        
        <Upload className="upload-icon" />
        
        <p className="primary-text">
          Drop your files here or click to browse
        </p>
        <p className="secondary-text">
          Supports PDF and image files
        </p>
      </div>

      {files.length > 0 && (
        <div className="file-list">
          <h3 className="file-list-title">Uploaded Files</h3>
          <ul className="file-list-items">
            {files.map((file, index) => (
              <li key={index} className="file-item">
                <div className="file-info">
                  <span className="file-name">
                    {file.name}
                  </span>
                  <span className="file-size">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="remove-button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
