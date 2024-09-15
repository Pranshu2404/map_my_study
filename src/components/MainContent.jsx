import React, { useContext, useState } from "react";
import {
  FaCode,
  FaCompass,
  FaLightbulb,
  FaMicrophone,
  FaUserCircle,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Context } from "../context/Context";
import geminiLogo from "../assets/geminiLogo.png";
import DocumentQA from "./DocumentQA"; // Import DocumentQA component
import QuizGenerator from "./QuizGenerator"; // Import QuizGenerator component
import StudyPlanGenerator from "./StudyPlanGenerator"; // Import StudyPlanGenerator component
import YouTubeSummarizer from "./YouTubeSummarizer"; // Import YouTubeSummarizer component
import MindMapApp from "./MindMapApp"; // Import MindMapApp component

const MainContent = () => {
  const {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    loading,
    resultData,
    onSent,
  } = useContext(Context);

  const [showDocumentQA, setShowDocumentQA] = useState(false); // State for showing DocumentQA
  const [showQuizGenerator, setShowQuizGenerator] = useState(false); // State for showing QuizGenerator
  const [showStudyPlanGenerator, setShowStudyPlanGenerator] = useState(false); // State for showing StudyPlanGenerator
  const [showYouTubeSummarizer, setShowYouTubeSummarizer] = useState(false); // State for showing YouTubeSummarizer
  const [showMindMapApp, setShowMindMapApp] = useState(false); // State for showing MindMapApp

  const handleShowDocumentQA = () => {
    setShowDocumentQA(true);
  };

  const handleShowQuizGenerator = () => {
    setShowQuizGenerator(true);
  };

  const handleShowStudyPlanGenerator = () => {
    setShowStudyPlanGenerator(true);
  };

  const handleShowYouTubeSummarizer = () => {
    setShowYouTubeSummarizer(true);
  };

  const handleShowMindMapApp = () => {
    setShowMindMapApp(true);
  };

  return (
    <div className="flex-1 min-h-screen relative bg-black">
      <div className="flex items-center justify-between text-xl p-5 text-slate-700">
        <p className="text-white font-bold">MapMyStudy</p>
        <FaUserCircle className="text-[#6ce9ff]"/>
      </div>

      <div className="max-w-[900px] mx-auto">
        {!showDocumentQA &&
        !showQuizGenerator &&
        !showStudyPlanGenerator &&
        !showYouTubeSummarizer &&
        !showMindMapApp ? ( // Conditionally show components
          !showResult ? (
            <>
              <div className="text-[56px] text-slate-500 font-semibold">
                <p>
                  <span className="bg-gradient-to-r from-[#54e5ff] to-[#bcf5ff] bg-clip-text text-transparent">
                    Hey, Bright Minds.
                  </span>
                </p>
                <p className="text-white">How can I guide you today?</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-5">
                <div
                  className="h-[200px] p-4 bg-[#6ce9ff] bg-opacity-30 rounded-lg relative cursor-pointer hover:bg-opacity-70"
                  onClick={handleShowDocumentQA}
                >
                  <p className="text-white text-lg">Document Q/A</p>
                  <FaCompass className="text-white text-4xl p-1 absolute bottom-2 right-2" />
                </div>

                <div
                  className="h-[200px] p-4 bg-[#6ce9ff] bg-opacity-30 rounded-lg relative cursor-pointer hover:bg-opacity-70"
                  onClick={handleShowQuizGenerator}
                >
                  <p className="text-white text-lg">Generate Quiz</p>
                  <FaLightbulb className="text-4xl p-1 absolute bottom-2 right-2 text-white" />
                </div>

                <div
                  className="h-[200px] p-4 bg-[#6ce9ff] bg-opacity-30 rounded-lg relative cursor-pointer hover:bg-opacity-70"
                  onClick={handleShowStudyPlanGenerator}
                >
                  <p className="text-white text-lg">Generate Study Plan</p>
                  <FaMessage className="text-white text-4xl p-1 absolute bottom-2 right-2" />
                </div>

                <div
                  className="h-[200px] p-4 bg-[#6ce9ff] bg-opacity-30 rounded-lg relative cursor-pointer hover:bg-opacity-70"
                  onClick={handleShowYouTubeSummarizer}
                >
                  <p className="text-white text-lg">YouTube Summarizer</p>
                  <FaCode className="text-white text-4xl p-1 absolute bottom-2 right-2" />
                </div>

                <div
                  className="h-[200px] p-4 bg-[#6ce9ff] bg-opacity-30 rounded-lg relative cursor-pointer hover:bg-opacity-70"
                  onClick={handleShowMindMapApp}
                >
                  <p className="text-white text-lg">Generate Mind Map</p>
                  <FaLightbulb className="text-white text-4xl p-1 absolute bottom-2 right-2" />
                </div>
              </div>
            </>
          ) : (
            <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll scrollbar-hidden">
              <div className="my-10 mx-0 flex items-center gap-5">
                <FaUserCircle className="text-3xl" />
                <p className="text-lg font-[400] leading-[1.8]">{recentPrompt}</p>
              </div>

              <div className="flex items-start gap-5">
                <img src={geminiLogo} alt="" className="w-8 rounded-[50%]" />
                {loading ? (
                  <div className="w-full flex flex-col gap-2">
                    <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />
                    <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />
                    <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />
                  </div>
                ) : (
                  <p
                    dangerouslySetInnerHTML={{ __html: resultData }}
                    className="text-lg font-[400] leading-[1.8]"
                  ></p>
                )}
              </div>
            </div>
          )
        ) : showDocumentQA ? (
          <DocumentQA />
        ) : showQuizGenerator ? (
          <QuizGenerator />
        ) : showStudyPlanGenerator ? (
          <StudyPlanGenerator />
        ) : showYouTubeSummarizer ? (
          <YouTubeSummarizer />
        ) : (
          <MindMapApp /> // Show the MindMapApp component when clicked
        )}

        <div className="w-full max-w-[900px]">
          <p className="absolute text-sm mx-auto text-center font-[500] text-slate-600 bottom-0">
            Map My Study is subjected to education risks. Use carefully
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
