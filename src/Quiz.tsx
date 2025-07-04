import React, { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface Answer {
  selected: number;
  correct: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the git command that downloads your repository from GitHub to your computer?",
    options: ["git push", "git commit", "git fork", "git clone"],
    correctIndex: 3,
    explanation: "git clone downloads the repository to your local machine.",
  },
  {
    id: 2,
    question: "Which React hook is used to manage component state?",
    options: ["useEffect", "useState", "useReducer", "useContext"],
    correctIndex: 1,
    explanation: "useState allows you to declare state variables in functional components.",
  },
  {
    id: 3,
    question: "What does JSX stand for?",
    options: ["JavaScript XML", "Java Syntax Extension", "JSON Syntax Extension", "Java Standard XML"],
    correctIndex: 0,
    explanation: "JSX stands for JavaScript XML, allowing HTML-like syntax in React.",
  },
  {
    id: 4,
    question: "What command initializes a new Git repository?",
    options: ["git start", "git init", "git create", "git new"],
    correctIndex: 1,
    explanation: "git init initializes a new Git repository.",
  },
  {
    id: 5,
    question: "What file is used to specify which files Git should ignore?",
    options: [".gitconfig", ".gitignore", ".npmignore", ".env"],
    correctIndex: 1,
    explanation: ".gitignore lists files/folders Git should not track.",
  },
  {
    id: 6,
    question: "Which command stages all changed files in Git?",
    options: ["git add .", "git stage all", "git commit -a", "git stash"],
    correctIndex: 0,
    explanation: "git add . stages all modified and new files.",
  },
  {
    id: 7,
    question: "What command commits staged changes with a message?",
    options: ["git commit", "git commit -m 'message'", "git save", "git push commit"],
    correctIndex: 1,
    explanation: "git commit -m 'message' commits with a message.",
  },
  {
    id: 8,
    question: "How do you send your local commits to GitHub?",
    options: ["git pull", "git send", "git upload", "git push"],
    correctIndex: 3,
    explanation: "git push uploads your commits to GitHub.",
  },
  {
    id: 9,
    question: "What is TypeScript?",
    options: ["A CSS preprocessor", "A static type checker for JavaScript", "A database", "A task runner"],
    correctIndex: 1,
    explanation: "TypeScript adds static typing to JavaScript.",
  },
  {
    id: 10,
    question: "What is a React component?",
    options: ["A styled div", "A function or class that returns JSX", "A package", "A variable"],
    correctIndex: 1,
    explanation: "A React component is a function or class that returns JSX.",
  },
  {
    id: 11,
    question: "Which file is the entry point in a Create React App project?",
    options: ["App.tsx", "index.tsx", "main.tsx", "root.tsx"],
    correctIndex: 1,
    explanation: "index.tsx is the entry file that renders the root component.",
  },
  {
    id: 12,
    question: "What does `useEffect` do in React?",
    options: ["Manages state", "Performs side effects like API calls", "Renders JSX", "Creates events"],
    correctIndex: 1,
    explanation: "useEffect handles side effects in React components.",
  },
  {
    id: 13,
    question: "What’s the command to install a package?",
    options: ["npm i", "npm start", "npm run", "npm commit"],
    correctIndex: 0,
    explanation: "npm i (short for install) adds a package to your project.",
  },
  {
    id: 14,
    question: "How do you define a React component in TypeScript?",
    options: [
      "function MyComponent()",
      "const MyComponent: React.FC = () => {}",
      "const MyComponent = () => {}",
      "class MyComponent {}"
    ],
    correctIndex: 1,
    explanation: "React.FC is a type for function components in TypeScript.",
  },
  {
    id: 15,
    question: "What does `npm start` do?",
    options: ["Starts a Git repo", "Compiles your TypeScript", "Starts the dev server", "Creates a new project"],
    correctIndex: 2,
    explanation: "npm start runs the app on a local development server.",
  },
  {
    id: 16,
    question: "Where are static assets like images placed in React?",
    options: ["src/assets", "src/images", "public/", "dist/"],
    correctIndex: 2,
    explanation: "public/ is used for static assets in Create React App.",
  },
  {
    id: 17,
    question: "What command checks for TypeScript errors?",
    options: ["tsc", "tslint", "npm start", "npm check"],
    correctIndex: 0,
    explanation: "tsc (TypeScript compiler) checks for type errors.",
  },
  {
    id: 18,
    question: "What does `key` prop do in React lists?",
    options: ["Encrypts data", "Specifies index", "Uniquely identifies elements", "Defines styling"],
    correctIndex: 2,
    explanation: "key helps React identify elements in lists for rendering.",
  },
  {
    id: 19,
    question: "How do you style components in React?",
    options: ["Inline styles", "CSS files", "Styled-components", "All of the above"],
    correctIndex: 3,
    explanation: "All options are valid ways to style React components.",
  },
  {
    id: 20,
    question: "What is CircleCI used for?",
    options: ["Hosting web apps", "Running tests and builds automatically", "Designing UIs", "Writing CSS"],
    correctIndex: 1,
    explanation: "CircleCI is a continuous integration service.",
  }
];

const Quiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (selectedIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(selectedIndex);
    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswers((prev) => [
      ...prev,
      { selected: selectedIndex, correct: currentQuestion.correctIndex },
    ]);

    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setShowSummary(true);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: 700, margin: "auto" }}>
      {!showSummary ? (
        <div>
          <h2>{currentQuestion.question}</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQuestion.correctIndex;

              let bgColor = "";
              if (showFeedback) {
                if (isSelected && isCorrect) bgColor = "lightgreen";
                else if (isSelected && !isCorrect) bgColor = "salmon";
                else if (isCorrect) bgColor = "lightgreen";
              }

              return (
                <li key={idx} style={{ marginBottom: "0.5rem" }}>
                  <button
                    onClick={() => handleAnswer(idx)}
                    disabled={selectedAnswer !== null}
                    style={{
                      padding: "0.5rem 1rem",
                      width: "100%",
                      backgroundColor: bgColor,
                      border: "1px solid #ccc",
                      cursor: selectedAnswer === null ? "pointer" : "default",
                    }}
                  >
                    {option}
                  </button>
                </li>
              );
            })}
          </ul>

          {showFeedback && (
            <>
              <p>
                {selectedAnswer === currentQuestion.correctIndex
                  ? "✅ Correct!"
                  : `❌ Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctIndex]}`}
              </p>
              <p><strong>Explanation:</strong> {currentQuestion.explanation}</p>
              <button onClick={handleNext}>Next</button>
            </>
          )}

          <p>
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
      ) : (
        <div>
          <h2>🎉 Quiz Complete!</h2>
          <p>Your score: {score} / {questions.length}</p>
          <h3>📝 Summary:</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {questions.map((q, idx) => (
              <li key={q.id} style={{ marginBottom: "1rem" }}>
                <strong>Q{idx + 1}:</strong> {q.question}<br />
                <strong>Your answer:</strong>{" "}
                {q.options[answers[idx]?.selected] ?? "Not answered"}<br />
                <strong>Correct answer:</strong> {q.options[q.correctIndex]}<br />
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
