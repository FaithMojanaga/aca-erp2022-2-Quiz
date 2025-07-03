import React, { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the git command that downloads your repository from GitHub to your computer?",
    options: ["git push", "git commit", "git fork", "git clone"],
    correctIndex: 3,
    explanation: "git clone downloads the repository to your local machine.",
  },
  // Add more questions here later
];

const Quiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === currentQuestion.correctIndex) {
      setScore(score + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowSummary(true);
    }
  };

  return (
    <div>
      {!showSummary ? (
        <div>
          <h2>{currentQuestion.question}</h2>
          <ul>
            {currentQuestion.options.map((option, idx) => (
              <li key={idx}>
                <button onClick={() => handleAnswer(idx)}>{option}</button>
              </li>
            ))}
          </ul>
          <p>
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
      ) : (
        <div>
          <h2>Quiz Complete!</h2>
          <p>
            Your score: {score} / {questions.length}
          </p>
          <h3>Summary:</h3>
          <ul>
            {questions.map((q) => (
              <li key={q.id}>
                <strong>Q:</strong> {q.question} <br />
                <strong>Explanation:</strong> {q.explanation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Quiz;
