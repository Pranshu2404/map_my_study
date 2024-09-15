import React, { useState } from 'react';
import axios from 'axios';

const DocumentQA = () => {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !prompt) {
      setError('Please upload a file and provide a prompt');
      return;
    }

    const formData = new FormData();
    formData.append('uploaded_file', file);
    formData.append('prompt1', prompt);

    setLoading(true);
    setError(null);

    try {
      const result = await axios.post('https://web-4fju.onrender.com/document_qa', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResponse(result.data);
    } catch (err) {
      setError('Error submitting the form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[500px]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Document QA</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Upload Document:</label>
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Enter Prompt:</label>
            <input 
              type="text" 
              value={prompt} 
              onChange={handlePromptChange} 
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
        {loading && <p className="text-center text-blue-600 mt-4">Loading...</p>}
        {response && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-md">
            <h3 className="text-lg font-semibold text-green-800">Answer:</h3>
            <p className="text-gray-700">{response.answer}</p>
            <p className="text-gray-500">Response Time: {response.response_time} seconds</p>
          </div>
        )}
        {error && <p className="text-center text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default DocumentQA;
