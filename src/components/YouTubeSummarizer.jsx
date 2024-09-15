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
    <div className="youtube-summarizer">
      <h2>YouTube Video Summarizer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="youtubeLink">YouTube Link:</label>
          <input
            type="text"
            id="youtubeLink"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="language">Language:</label>
          <input
            type="text"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Summary"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {summary && (
        <div className="summary-output">
          <h3>Summary:</h3>
          <pre>{JSON.stringify(summary, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default YouTubeSummarizer;