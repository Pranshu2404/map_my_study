import React, { useState } from "react";
import axios from "axios";

const YouTubeSummarizer = () => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [language, setLanguage] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSummary(null);

    const formData = new FormData();
    formData.append("youtube_link", youtubeLink);
    formData.append("language", language);

    try {
      const response = await axios.post(
        "https://web-4fju.onrender.com/yotube_summarizer",
        formData
      );
      setSummary(response.data);
    } catch (err) {
      setError("An error occurred while fetching the summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white p-6">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-xl shadow-2xl transition-all duration-300 hover:shadow-purple-500/30">
          <h1 className="text-4xl max-md:text-2xl font-bold text-center text-white mb-4">
            YouTube Video Summarizer
          </h1>
          <div className="mb-6 ">
            <label
              htmlFor="youtubeLink"
              className="block text-lg font-medium text-purple-100 mb-2"
            >
              YouTube Link:
            </label>
            <input
              type="text"
              id="youtubeLink"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              required
              className="mt-1 block w-full text-lg text-gray-900 bg-purple-100 border border-purple-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3 transition-all duration-200"
              placeholder="Enter YouTube video URL"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="language"
              className="block text-lg font-medium text-purple-100 mb-2"
            >
              Language:
            </label>
            <input
              type="text"
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              required
              className="mt-1 block w-full text-lg text-gray-900 bg-purple-100 border border-purple-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3 transition-all duration-200"
              placeholder="Enter desired summary language"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-105"
            }`}
          >
            {loading ? "Summarizing..." : "Get Summary"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 border-2 border-indigo-500 text-purple-400 rounded-lg shadow-lg">
            <p className="font-semibold">Coming Soon...</p>
          </div>
        )}

        {summary && (
          <div className="mt-8 bg-gradient-to-r from-purple-500 to-indigo-500 p-8 rounded-xl shadow-2xl">
            <h3 className="text-2xl font-semibold text-white mb-4">Summary:</h3>
            <pre className="whitespace-pre-wrap break-words text-purple-100 bg-purple-800 bg-opacity-50 p-4 rounded-lg">
              {JSON.stringify(summary, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeSummarizer;