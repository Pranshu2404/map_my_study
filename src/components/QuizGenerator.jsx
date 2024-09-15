import React, { useState } from 'react';

const QuizGenerator = () => {
  const [file, setFile] = useState(null);
  const [numQuestions, setNumQuestions] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null); // For score
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('num', numQuestions);

    try {
      const response = await fetch('https://web-4fju.onrender.com/generate_quiz', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setQuiz(data.quiz);
        setError(null);
        setSelectedAnswers({}); // Reset selected answers when a new quiz is generated
        setScore(null); // Reset score when a new quiz is generated
      } else {
        setError(data.error);
        setQuiz(null);
      }
    } catch (err) {
      console.error('Error generating quiz:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  const handleAnswerSelect = (questionIndex, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        correctCount += 1;
      }
    });
    setScore(correctCount);
  };

  return (
    <div>
      <h1>Generate a Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Upload PDF:</label>
          <input
            type="file"
            id="file"
            accept="application/pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label htmlFor="numQuestions">Number of Questions:</label>
          <input
            type="number"
            id="numQuestions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            required
          />
        </div>
        <button type="submit">Generate Quiz</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {quiz && (
        <div>
          <h2>Quiz</h2>
          <ul>
            {quiz.map((q, index) => (
              <li key={index}>
                <strong>{q.question}</strong>
                <ul>
                  {q.options.map((option, i) => (
                    <li key={i}>
                      <label>
                        <input
                          type="checkbox"
                          name={`question-${index}`}
                          value={option}
                          checked={selectedAnswers[index] === option}
                          onChange={() => handleAnswerSelect(index, option)}
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <button onClick={handleSubmitQuiz}>Submit Quiz</button>

          {score !== null && (
            <div>
              <h3>Scorecard</h3>
              <p>
                You got {score} out of {quiz.length} correct.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
