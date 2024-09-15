import React, { useState } from "react";
import axios from "axios";

const StudyPlanGenerator = () => {
  const [file, setFile] = useState(null);
  const [studyPlan, setStudyPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStudyPlan("");

    if (!file) {
      setError("Please upload a file");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("uploaded_file", file);

    try {
      const response = await axios.post(
        "https://web-4fju.onrender.com/generate_study_plan/",
        formData
      );
      setStudyPlan(response.data.study_plan);
    } catch (err) {
      setError("An error occurred while generating the study plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="study-plan-generator">
      <h2>Study Plan Generator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fileUpload">Upload PDF:</label>
          <input type="file" id="fileUpload" onChange={handleFileChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Study Plan"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {studyPlan && (
        <div className="study-plan-output">
          <h3>Generated Study Plan:</h3>
          <pre>{studyPlan}</pre>
        </div>
      )}
    </div>
  );
};

export default StudyPlanGenerator;