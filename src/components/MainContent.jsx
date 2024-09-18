import React, { useContext, useState } from "react";
import { GiNotebook } from "react-icons/gi";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { LiaSitemapSolid } from "react-icons/lia";
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
import DocumentQA from "./DocumentQA";
import QuizGenerator from "./QuizGenerator";
import StudyPlanGenerator from "./StudyPlanGenerator";
import YouTubeSummarizer from './YouTubeSummarizer1';
import MindMapApp from "./MindMapApp";

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

  const [showDocumentQA, setShowDocumentQA] = useState(false);
  const [showQuizGenerator, setShowQuizGenerator] = useState(false);
  const [showStudyPlanGenerator, setShowStudyPlanGenerator] = useState(false);
  const [showYouTubeSummarizer, setShowYouTubeSummarizer] = useState(false);
  const [showMindMapApp, setShowMindMapApp] = useState(false);

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
  const handleCloseAll = () => {
    setShowDocumentQA(false);
    setShowQuizGenerator(false);
    setShowStudyPlanGenerator(false);
    setShowYouTubeSummarizer(false);
    setShowMindMapApp(false);
  };

  return (
    <div className="flex-1 min-h-screen relative bg-gradient-to-br from-gray-900 to-black px-5">
      <div className="flex justify-between text-xl p-5 text-slate-300">
      <div className="max-md:w-[80%] w-[50%] flex justify-between max-md:justify-normal max-md:flex-col">
  <p className="text-white font-bold ml-10">iMapMyStudy</p>
  {(showDocumentQA || showQuizGenerator || showStudyPlanGenerator || showYouTubeSummarizer || showMindMapApp) && (
    <button
      onClick={handleCloseAll}
      className="relative max-md:mt-2 text-indigo-500 max-md:ml-10 rounded-full shadow-lg hover:text-white transition-colors duration-200"
    >
      &larr; Back
    </button>
  )}
</div>
        <FaUserCircle className="text-indigo-400 mt-2"/>
      </div>
      
      <div className="max-w-[900px] mx-auto">
        {!showDocumentQA &&
        !showQuizGenerator &&
        !showStudyPlanGenerator &&
        !showYouTubeSummarizer &&
        !showMindMapApp ? (
          !showResult ? (
            <>
              <div className="text-[56px] text-slate-300 font-semibold max-md:text-[25px]">
                <p>
                  <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    Hey, Bright Mind...
                  </span>
                </p>
                <p className="text-white">How can I guide you today?</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-5">
                <div
                  className="h-[200px] max-md:h-[60px] p-4 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-lg relative cursor-pointer hover:from-indigo-500 hover:to-blue-400 transition-all duration-300 shadow-lg hover:scale-105"
                  onClick={handleShowDocumentQA}
                >
                  <p className="text-white text-xl max-md:text-lg font-semibold">Document Q/A</p>
                  <FaFileCircleQuestion className="text-white text-4xl p-1 absolute bottom-2 right-2" />
                </div>

                <div
                  className="h-[200px] max-md:h-[60px] p-4 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg relative cursor-pointer hover:from-purple-500 hover:to-pink-400 transition-all duration-300 shadow-lg hover:scale-105 "
                  onClick={handleShowQuizGenerator}
                >
                  <p className="text-white text-xl max-md:text-lg font-semibold">Generate Quiz</p>
                  <FaLightbulb className="text-4xl p-1 absolute bottom-2 right-2 text-white" />
                </div>

                <div
                  className="h-[200px] max-md:h-[60px] p-4 bg-gradient-to-br from-green-600 to-teal-500 rounded-lg relative cursor-pointer hover:from-green-500 hover:to-teal-400 transition-all duration-300 shadow-lg hover:scale-105"
                  onClick={handleShowStudyPlanGenerator}
                >
                  <p className="text-white text-xl max-md:text-lg font-semibold">Generate Study Plan</p>
                  <GiNotebook className="text-white text-4xl p-1 absolute bottom-2 right-2" />
                </div>

                <div
                  className="h-[200px] max-md:h-[60px] p-4 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg relative cursor-pointer hover:from-red-500 hover:to-orange-400 transition-all duration-300 shadow-lg hover:scale-105"
                  onClick={handleShowYouTubeSummarizer}
                >
                  <p className="text-white text-xl max-md:text-lg font-semibold">YouTube Summarizer</p>
                  <FaCode className="text-white text-4xl p-1 absolute bottom-2 right-2" />
                </div>

                <div
                  className="h-[200px] max-md:h-[60px] p-4 bg-gradient-to-br from-yellow-600 to-amber-500 rounded-lg relative cursor-pointer hover:from-yellow-500 hover:to-amber-400 transition-all duration-300 shadow-lg hover:scale-105"
                  onClick={handleShowMindMapApp}
                >
                  <p className="text-white text-xl max-md:text-lg font-semibold">Generate Mind Map</p>
                  <LiaSitemapSolid className="text-white text-5xl p-1 absolute bottom-2 right-2" />
                </div>
              </div>
            </>
          ) : (
            <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll scrollbar-hidden">
              <div className="my-10 mx-0 flex items-center gap-5">
                <FaUserCircle className="text-3xl text-indigo-400" />
                <p className="text-lg font-[400] leading-[1.8] text-slate-300">{recentPrompt}</p>
              </div>

              <div className="flex items-start gap-5">
                <img src={geminiLogo} alt="" className="w-8 rounded-[50%]" />
                {loading ? (
                  <div className="w-full flex flex-col gap-2">
                    <hr className="rounded-md border-none bg-gray-700 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 animate-pulse" />
                    <hr className="rounded-md border-none bg-gray-700 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 animate-pulse" />
                    <hr className="rounded-md border-none bg-gray-700 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 animate-pulse" />
                  </div>
                ) : (
                  <p
                    dangerouslySetInnerHTML={{ __html: resultData }}
                    className="text-lg font-[400] leading-[1.8] text-slate-300"
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
          <MindMapApp />
        )}

<div className="absolute bottom-2 max-md:bottom-1 w-[60%] max-md:w-[90%]">
  <p className="text-sm max-md:text-[9px] text-center font-medium text-slate-400 bottom-0">
    iMapMyStudy is subject to Education Risks. Use at your own Discretion.
  </p>
</div>

      </div>
    </div>
  );
};

export default MainContent;