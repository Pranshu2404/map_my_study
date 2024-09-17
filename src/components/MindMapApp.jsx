import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import mermaid from 'mermaid';
import html2canvas from 'html2canvas';

const MindMapApp = () => {
  const [file, setFile] = useState(null);
  const [mermaidCode, setMermaidCode] = useState('');
  const [error, setError] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);
  const scrollTop = useRef(0);
  const isDragging = useRef(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setError(null);
    setIsUploaded(false);

    if (!file) {
      setError('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://web-4fju.onrender.com/process_pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.mermaid_code) {
        const rawMermaidCode = response.data.mermaid_code;
        const formattedMermaidCode = cleanMermaidCode(rawMermaidCode).replace(/^mermaid/, '');
        if (formattedMermaidCode) {
          setMermaidCode(formattedMermaidCode);
          setIsUploaded(true);
        } else {
          throw new Error('No valid mindmap found in Mermaid code.');
        }
      } else {
        throw new Error('No Mermaid code returned from API.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (mermaidCode && isUploaded) {
      try {
        mermaid.initialize({ startOnLoad: true });
        if (containerRef.current) {
          containerRef.current.innerHTML = mermaidCode;
          mermaid.contentLoaded(undefined, containerRef.current);
        }
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
      }
    }
  }, [mermaidCode, isUploaded]);

  const cleanMermaidCode = (mermaidCode) => {
    let cleanedCode = mermaidCode.replace(/^mermaid/, '');
    cleanedCode = cleanedCode
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#/g, '')
      .replace(/\+/g, '')
      .replace(/\`\`\`/g, '');
    return cleanedCode.trim();
  };

  const handleDownloadPNG = () => {
    if (containerRef.current) {
      html2canvas(containerRef.current).then(canvas => {
        const img = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = img;
        link.download = 'diagram.png';
        link.click();
      });
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prevZoom => {
      const newZoom = Math.min(prevZoom * 1.2, 3); // Limit zoom level to a maximum of 3
      if (mapRef.current) {
        mapRef.current.style.transform = `scale(${newZoom})`;
        mapRef.current.style.transformOrigin = '0 0'; // Keep the origin at the top-left corner
      }
      return newZoom;
    });
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoom => {
      const newZoom = Math.max(prevZoom * 0.8, 0.5); // Limit zoom level to a minimum of 0.5
      if (mapRef.current) {
        mapRef.current.style.transform = `scale(${newZoom})`;
        mapRef.current.style.transformOrigin = '0 0';
      }
      return newZoom;
    });
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX - mapRef.current.offsetLeft;
    startY.current = e.clientY - mapRef.current.offsetTop;
    scrollLeft.current = mapRef.current.scrollLeft;
    scrollTop.current = mapRef.current.scrollTop;
    mapRef.current.style.cursor = 'grabbing'; // Change cursor to grabbing
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      e.preventDefault();
      const x = e.clientX - mapRef.current.offsetLeft;
      const y = e.clientY - mapRef.current.offsetTop;
      const walkX = (x - startX.current) * 2;
      const walkY = (y - startY.current) * 2;
      mapRef.current.scrollLeft = scrollLeft.current - walkX;
      mapRef.current.scrollTop = scrollTop.current - walkY;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    mapRef.current.style.cursor = 'grab'; // Change cursor to grab when not dragging
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  useEffect(() => {
    const mapElement = mapRef.current;
    if (mapElement) {
      mapElement.addEventListener('mousedown', handleMouseDown);
      mapElement.addEventListener('mousemove', handleMouseMove);
      mapElement.addEventListener('mouseup', handleMouseUp);
      mapElement.addEventListener('mouseleave', handleMouseUp);
      mapElement.addEventListener('wheel', handleWheel);

      return () => {
        mapElement.removeEventListener('mousedown', handleMouseDown);
        mapElement.removeEventListener('mousemove', handleMouseMove);
        mapElement.removeEventListener('mouseup', handleMouseUp);
        mapElement.removeEventListener('mouseleave', handleMouseUp);
        mapElement.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8 relative">
  {/* Upload Section */}
  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-8 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-purple-500/30">
    <h1 className="text-5xl max-md:text-3xl font-extrabold text-center text-white mb-8 tracking-tight">
      MindMap Generator
    </h1>
    
    <div className="relative">
      <input
        type="file"
        onChange={handleFileChange}
        accept="application/pdf"
        className="block w-full mb-4 text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
      />
      <button
        onClick={handleUpload}
        className="w-full py-3 px-6 font-semibold rounded-full shadow-md bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 transition-all duration-300 transform hover:translate-y-[-2px]"
      >
        Upload PDF
      </button>
    </div>
  </div>

  {error && (
    <div className="mb-8 p-6 text-red-100 bg-red-600 rounded-xl border border-red-400 shadow-lg animate-pulse">
      <strong className="font-semibold">Error:</strong> {error}
    </div>
  )}

  {/* Mind Map Card - Display only after upload */}
  {isUploaded && (
    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-2xl mb-8 overflow-hidden">
      <button
        onClick={handleDownloadPNG}
        className="absolute top-4 right-4 py-2 px-4 font-semibold rounded-full shadow-md bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 transition-all duration-300"
      >
        Download PNG
      </button>
      <h2 className="text-3xl font-bold mb-6 text-white">Mind Map Diagram</h2>
      <div
        ref={mapRef}
        className="relative w-full h-[28rem] overflow-auto border border-gray-600 rounded-lg bg-gray-800"
        style={{ position: 'relative', touchAction: 'none', cursor: 'grab' }}
      >
        <div 
          ref={containerRef} 
          className="mermaid" 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        ></div>
      </div>
    </div>
  )}

  {/* Zoom Controls - Outside of the mind map card */}
  {isUploaded && (
    <div className="flex justify-center gap-6 mt-6">
      <button
        onClick={handleZoomIn}
        className="py-3 px-6 font-semibold rounded-full shadow-md bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
      >
        Zoom In
      </button>
      <button
        onClick={handleZoomOut}
        className="py-3 px-6 font-semibold rounded-full shadow-md bg-purple-500 text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
      >
        Zoom Out
      </button>
    </div>
  )}
</div>);
};
export default MindMapApp;
