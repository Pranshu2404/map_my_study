import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from "react-bootstrap";
import { MdFileUpload, MdDescription, MdError } from "react-icons/md";
import ReactHtmlParser from 'react-html-parser';
import '../index.css'

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
  const formatResponse = (text) => {
    // Convert **bold text** to <strong>bold text</strong>
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong style="font-size: 1.5rem; color: #38bdf8;">$1</strong>');
    
    // Replace bullet points
    formattedText = formattedText
      .replace(/^\s*\*\s+/gm, '<li style="color: #fef08a;">')   // Convert bullet points
      .replace(/<\/li>\s*<li>/g, '</li><li style="color: #fef08a;">') // Fix broken list items
      .replace(/(\n|^)\*\s+/g, '$1<li style="color: #fef08a;">')   // Ensure no extra <li> tags
      .concat('</li>'); // Close the last list item
  
    // Preserve line breaks
    formattedText = formattedText.replace(/\n/g, '<br>');
  
    // Return HTML with <ul> tags
    return `<ul>${formattedText}</ul>`;
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
      console.log(result.data)
      setResponse(result.data);
    } catch (err) {
      setError('Error submitting the form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 mb-5 p-8 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-purple-500/30">
            <h1 className="text-4xl max-md:text-2xl font-extrabold text-center text-white mb-6">Document QA</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Form.Label htmlFor="fileUpload" className="block text-lg font-medium text-white mb-2">
                  Upload PDF:
                </Form.Label>
                <div className="flex items-center space-x-4">
                  <div><Form.Control
                    type="file"
                    id="fileUpload"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 focus:outline-none"
                    accept=".pdf"
                  /></div>
                  <MdFileUpload className="w-6 h-6 text-purple-300" />
                  
                </div>
                
                <p className='relative max-md:top-2  m-1 text-white'>{file? 'File Uploaded':''}</p>
              </div>
              <div>
                <Form.Label htmlFor="prompt" className="block text-lg font-medium text-white mb-2">
                  Enter Prompt:
                </Form.Label>
                <Form.Control
                  type="text"
                  id="prompt"
                  value={prompt}
                  onChange={handlePromptChange}
                  className="mt-1 block w-full text-base text-gray-900 bg-purple-100 border border-purple-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3 transition-all duration-200"
                  placeholder="Ask a question about the document..."
                />
              </div>
              <Button
                type="submit"
                disabled={loading || !file}
                className={`w-full py-3 px-6 text-lg max-md:text-sm text-white font-semibold rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 transition-all duration-300 ${
                  loading || !file
                    ? "bg-gray-800 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white transform hover:scale-105"
                }`}
              >
                {loading ? "Generating..." : "Ask From Document"}
              </Button>
            </form>
          </div>
          {loading && (
                <div className="loader">
                <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
                </div>
                </div>
                 )}
          
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
                <MdError className="w-5 h-5 mr-2" />
                <p>{error}</p>
              </div>
            )}
            {response && (
              <div className="p-6  border border-indigo-500 rounded-xl">
                <h3 className="text-xl font-semibold text-green-100 mb-2 flex items-center">
                  <MdDescription className="w-6 h-6 mr-2" />
                  Answer:
                </h3>
                <div
              className="mb-4 text-purple-400"
              dangerouslySetInnerHTML={{ __html: formatResponse(response.answer) }}
            />
                <p className="text-sm text-gray-500">Response Time: {response.response_time} seconds</p>
              </div>
            )}
          
          
      
      </div>
    </div>
  );
};

export default DocumentQA;