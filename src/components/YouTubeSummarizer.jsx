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
    <div className="max-w-2xl mx-auto p-6 bg-black min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        YouTube Video Summarizer
      </h1>
        <div className="mb-4">
          <label
            htmlFor="youtubeLink"
            className="block text-sm font-medium text-gray-700"
          >
            YouTube Link:
          </label>
          <input
            type="text"
            id="youtubeLink"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            required
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700"
          >
            Language:
          </label>
          <input
            type="text"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {loading ? "Loading..." : "Get Summary"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-500 text-center font-semibold">{error}</p>
      )}

      {summary && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Summary:</h3>
          <pre className="whitespace-pre-wrap break-words text-gray-700">
            {JSON.stringify(summary, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default YouTubeSummarizer;
