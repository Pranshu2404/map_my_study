import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import mermaid from 'mermaid';
import html2canvas from 'html2canvas'

const MindMapApp = () => {
  const [file, setFile] = useState(null);
  const containerRef = useRef(null);
  const [mermaidCode, setMermaidCode] = useState('');
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // const extractMindmapCode = (mermaidCode) => {
  //   const mindmapMatch = mermaidCode.match(/mindmap[\s\S]*/); // Find the 'mindmap' block
  //   if (mindmapMatch) {
  //     return mindmapMatch[0].trim(); // Return the 'mindmap' code only
  //   }
  //   return '';
  // };

  const handleUpload = async () => {
    setError(null);

    if (!file) {
      setError('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://web-4fju.onrender.com/process_pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.mermaid_code) {
        const rawMermaidCode = response.data.mermaid_code;
        console.log(rawMermaidCode)
        // const formattedMermaidCode = extractMindmapCode(rawMermaidCode);
        const formattedMermaidCode = cleanMermaidCode(rawMermaidCode).replace(/^mermaid/, '');
        if (formattedMermaidCode) {
          console.log(formattedMermaidCode)
          setMermaidCode(formattedMermaidCode);
        } else {
          throw new Error('No valid mindmap found in Mermaid code.');
        }
      } else {
        throw new Error('No Mermaid code returned from API.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (mermaidCode) {
      try {
        mermaid.initialize({ startOnLoad: true });
        // mermaid.contentLoaded();
        if (containerRef.current) {
                 containerRef.current.innerHTML = mermaidCode;
                 mermaid.contentLoaded(undefined, containerRef.current);
               }
      } catch (error) {
        console.error('Error rendering Mermaid diagram:', error);
      }
    }
  }, [mermaidCode]);
// const jsonData = {
//     "mermaid_code": "mermaid\nmindmap\n  Mother's Day\n    Social Message\n      Drama as a medium**\n      + Discuss the effectiveness of drama in conveying social messages\n      + Analyze the play's use of drama to convey social reform\n    Play Analysis\n    # \"Snapshots\"\n      Plot Summary**\n      + Introduce Mrs. Fitzgerald, who wants to change back\n      + Introduce Mrs. Pearson, who is reluctant to change back\n      Character Analysis**\n      + Mrs. Fitzgerald: nervous and fluttering\n      + Mrs. Pearson: bold and dominating\n      Themes**\n      + The status of the mother in the family\n      + Social reform and change\n    Writing Task\n    # Writing about Social Issues Today\n      Incidents and Examples**\n      + Relevant issues and problems that are relevant today\n      Analysis and Reflection**\n      + How do these issues relate to the play's themes and messages?\n      + What can be done to address these issues?\n      Note: The mind map is structured to reflect the main topics and subtopics, with brief descriptions in markdown language using \"**\" and \"###\" symbols.\n\n"
// };

// // Extract the Mermaid code from the JSON
// const mermaidCode1 = jsonData.mermaid_code;
// console.log(mermaidCode1)
function cleanMermaidCode(mermaidCode) {
  // Remove 'mermaid' keyword from the top
  let cleanedCode = mermaidCode.replace(/^mermaid/, '');
  
  // Remove '**', '*', '#', and '+' symbols
  cleanedCode = cleanedCode
      .replace(/\*\*/g, '')  // Remove '**'
      .replace(/\*/g, '')    // Remove '*'
      .replace(/#/g, '')     // Remove '#'
      .replace(/\+/g, '')
      .replace(/\`\`\`/g, '');   // Remove '+'
  console.log(cleanedCode)
  return cleanedCode; // Remove leading and trailing whitespace
}
// Output the Mermaid code (for demonstration)
// console.log(cleanMermaidCode(mermaidCode1));

// const mer2 = cleanMermaidCode(mermaidCode1)

// useEffect(() => {
//   if (mer2) {
//     try {
//       mermaid.initialize({ startOnLoad: true });
//       if (containerRef.current) {
//         containerRef.current.innerHTML = mer2;
//         mermaid.contentLoaded(undefined, containerRef.current);
//       }
//     } catch (error) {
//       console.error('Error rendering Mermaid diagram:', error);
//     }
//   }
// }, [mer2]);

const handleDownloadPNG = () => {
  if (containerRef.current) {
    console.log(containerRef.current)
    html2canvas(containerRef.current).then(canvas => {
      const img = canvas.toDataURL('image/png');
      console.log(img)
      const link = document.createElement('a');
      link.href = img;
      link.download = 'diagram.png';
      link.click();
    });
  }
};

  return (
    <div className="App">
      <h1>PDF to Mermaid Diagram</h1>
      <input type="file" onChange={handleFileChange} accept="application/pdf" />
      <button onClick={handleUpload}>Upload PDF</button>
      <div>
      <div ref={containerRef} className="mermaid"></div>
      <button onClick={handleDownloadPNG}>Download PNG</button>
      </div>
      {/* {error && (
        <div style={{ color: 'red' }}>
          <strong>Error:</strong> {error}
        </div>
      )} */}

      {/* {mermaidCode && (
        <>
          <h2>Mindmap Diagram</h2>
          <div className="mermaid">{mermaidCode}</div>
        </>
      )} */}
    </div>
// const containerRef = useRef(null);
  
//   function cleanMermaidCode(mermaidCode) {
//   // Remove 'mermaid' keyword from the top
//   let cleanedCode = mermaidCode.replace(/^mermaid\n/, '');
  
//   // Remove '**', '*', '#', and '+' symbols
//   cleanedCode = cleanedCode
//       .replace(/\*\*/g, '')  // Remove '**'
//       .replace(/\*/g, '')    // Remove '*'
//       .replace(/#/g, '')     // Remove '#'
//       .replace(/\+/g, '');   // Remove '+'
  
//   return cleanedCode; // Remove leading and trailing whitespace
// }
//   const mermaidCode = `
//     mindmap
//       Mother's Day
//         Social Message
//           Drama as a medium
//           + Discuss the effectiveness of drama in conveying social messages
//           + Analyze the play's use of drama to convey social reform
//         Play Analysis
//         # "Snapshots"
//           Plot Summary
//           + Introduce Mrs. Fitzgerald, who wants to change back
//           + Introduce Mrs. Pearson, who is reluctant to change back
//           Character Analysis
//           + Mrs. Fitzgerald: nervous and fluttering
//           + Mrs. Pearson: bold and dominating
//           Themes
//           + The status of the mother in the family
//           + Social reform and change
//         Writing Task
//         # Writing about Social Issues Today
//           Incidents and Examples
//           + Relevant issues and problems that are relevant today
//           Analysis and Reflection
//           + How do these issues relate to the play's themes and messages?
//           + What can be done to address these issues?
//           Note: The mind map is structured to reflect the main topics and subtopics, with brief descriptions in markdown language using "**" and "###" symbols.
//   `;
//    const cleanCode=cleanMermaidCode(mermaidCode);
//   useEffect(() => {
//     if (containerRef.current) {
//       containerRef.current.innerHTML = cleanCode;
//       mermaid.contentLoaded(undefined, containerRef.current);

//       // Check if the Mermaid diagram has been rendered
//       setTimeout(() => {
//         console.log(containerRef.current.innerHTML); // Log to check rendered content
//       }, 1000); // Give time for rendering
//     }
//   }, [cleanCode]);

//   const handleDownloadPNG = () => {
//     if (containerRef.current) {
//       html2canvas(containerRef.current).then(canvas => {
//         const img = canvas.toDataURL('image/png');
//         const link = document.createElement('a');
//         link.href = img;
//         link.download = 'diagram.png';
//         link.click();
//       }).catch(error => {
//         console.error('Error converting to PNG:', error);
//       });
//     }
//   };

//   return (
//     <div>
//       <div ref={containerRef} className="mermaid" style={{ display: 'block' }}></div>
//       <button onClick={handleDownloadPNG}>Download PNG</button>
//     </div>
  );
};

export default MindMapApp;
