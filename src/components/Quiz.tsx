import React, { useState, useEffect } from "react";

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
  ,
  {
    id: 21,
    question: "What command is used to create a new branch in Git?",
    options: ["git branch new-branch", "git create branch", "git checkout new-branch", "git new branch"],
    correctIndex: 0,
    explanation: "git branch new-branch creates a new branch without switching to it.",
  },
  {
    id: 22,
    question: "How do you switch to a different branch in Git?",
    options: ["git branch", "git checkout branch-name", "git switch branch-name", "Both 2 and 3"],
    correctIndex: 3,
    explanation: "git checkout and git switch can be used to change branches.",
  },
  {
    id: 23,
    question: "What is the purpose of the git merge command?",
    options: ["Combine changes from two branches", "Download updates from remote", "Push local commits", "Discard changes"],
    correctIndex: 0,
    explanation: "git merge combines changes from one branch into another.",
  },
  {
    id: 24,
    question: "Which React hook runs side effects after render?",
    options: ["useState", "useEffect", "useRef", "useContext"],
    correctIndex: 1,
    explanation: "useEffect runs side effects like API calls after the component renders.",
  },
  {
    id: 25,
    question: "What is a controlled component in React?",
    options: ["Component managing its own state", "Component state controlled by parent", "Component with refs only", "None of the above"],
    correctIndex: 1,
    explanation: "Controlled components have their state managed by parent via props.",
  },
  {
    id: 26,
    question: "How do you create a React context?",
    options: ["React.createContext()", "new React.Context()", "useContext()", "React.Context.create()"],
    correctIndex: 0,
    explanation: "React.createContext() creates a context object.",
  },
  {
    id: 27,
    question: "Which CSS-in-JS library is popular for React styling?",
    options: ["Styled-components", "Sass", "Bootstrap", "Tailwind"],
    correctIndex: 0,
    explanation: "Styled-components is a popular CSS-in-JS library for React.",
  },
  {
    id: 28,
    question: "What does npm stand for?",
    options: ["Node Package Manager", "Node Project Manager", "New Package Manager", "Node Programming Module"],
    correctIndex: 0,
    explanation: "npm stands for Node Package Manager.",
  },
  {
    id: 29,
    question: "Which command updates all packages to the latest version respecting semver?",
    options: ["npm upgrade", "npm update", "npm refresh", "npm install"],
    correctIndex: 1,
    explanation: "npm update updates packages respecting semantic versioning.",
  },
  {
    id: 30,
    question: "What’s the main difference between npm and yarn?",
    options: ["Yarn is faster and uses lock files", "npm supports React", "Yarn supports Vue only", "They are the same"],
    correctIndex: 0,
    explanation: "Yarn generally offers faster installs and uses a yarn.lock file for dependency versions.",
  },
  {
    id: 31,
    question: "In TypeScript, what is the 'any' type?",
    options: ["Disables type checking", "Allows any type of value", "Strictly a string", "Strictly a number"],
    correctIndex: 1,
    explanation: "'any' allows any type to be assigned, disabling type checks.",
  },
  {
    id: 32,
    question: "What is the purpose of 'interface' in TypeScript?",
    options: ["Define object shapes", "Run JavaScript code", "Compile TypeScript", "Manage dependencies"],
    correctIndex: 0,
    explanation: "Interfaces define the shape of objects in TypeScript.",
  },
  {
    id: 33,
    question: "Which method converts a React class component to a function component?",
    options: ["useState and hooks", "render()", "setState()", "componentDidMount()"],
    correctIndex: 0,
    explanation: "Function components use hooks like useState instead of lifecycle methods.",
  },
  {
    id: 34,
    question: "Which HTTP status code means 'Not Found'?",
    options: ["200", "301", "404", "500"],
    correctIndex: 2,
    explanation: "404 indicates the requested resource was not found.",
  },
  {
    id: 35,
    question: "Which Git command discards local changes to a file?",
    options: ["git revert", "git reset", "git checkout -- filename", "git commit"],
    correctIndex: 2,
    explanation: "git checkout -- filename discards changes to the file.",
  },
  {
    id: 36,
    question: "What is the default port number for React development server?",
    options: ["3000", "8080", "5000", "8000"],
    correctIndex: 0,
    explanation: "React development server runs by default on port 3000.",
  },
  {
    id: 37,
    question: "Which command installs dependencies listed in package.json?",
    options: ["npm i", "npm install", "npm update", "Both 1 and 2"],
    correctIndex: 3,
    explanation: "Both npm i and npm install install dependencies from package.json.",
  },
  {
    id: 38,
    question: "Which React feature allows splitting code to load lazily?",
    options: ["React.lazy()", "useEffect()", "useState()", "React.memo()"],
    correctIndex: 0,
    explanation: "React.lazy() allows lazy loading of components for better performance.",
  },
  {
    id: 39,
    question: "What is a Pure Component in React?",
    options: ["Component with no side effects", "Component that implements shallow comparison to prevent unnecessary re-renders", "Component without state", "Component that only renders once"],
    correctIndex: 1,
    explanation: "PureComponent implements shallow prop and state comparison for performance optimization.",
  },
  {
    id: 40,
    question: "Which tool is used to bundle JavaScript modules?",
    options: ["Webpack", "Babel", "ESLint", "Prettier"],
    correctIndex: 0,
    explanation: "Webpack bundles JavaScript files and assets for deployment.",
  },
  {
    id: 41,
    question: "What does Babel do in a React project?",
    options: ["Transpiles modern JavaScript to older versions for browser compatibility", "Bundles files", "Manages state", "Runs tests"],
    correctIndex: 0,
    explanation: "Babel transpiles newer JS syntax to widely supported versions.",
  },
  {
    id: 42,
    question: "Which command creates a new React app using Create React App?",
    options: ["npx create-react-app my-app", "npm create-react-app my-app", "npm react-create-app", "npx react-init"],
    correctIndex: 0,
    explanation: "npx create-react-app my-app sets up a new React project quickly.",
  },
  {
    id: 43,
    question: "What is the virtual DOM in React?",
    options: ["A copy of the real DOM kept in memory for efficient updates", "A real browser DOM", "A type of database", "A UI framework"],
    correctIndex: 0,
    explanation: "Virtual DOM allows React to efficiently update the UI by diffing changes.",
  },
  {
    id: 44,
    question: "How do you pass data from a parent to child component in React?",
    options: ["Using props", "Using state", "Using refs", "Using context only"],
    correctIndex: 0,
    explanation: "Props allow passing data from parent to child components.",
  },
  {
    id: 45,
    question: "Which keyword is used to declare a constant variable in JavaScript?",
    options: ["var", "let", "const", "static"],
    correctIndex: 2,
    explanation: "const declares variables with block scope and prevents reassignment.",
  },
  {
    id: 46,
    question: "What is the result of 'typeof null' in JavaScript?",
    options: ["null", "object", "undefined", "boolean"],
    correctIndex: 1,
    explanation: "typeof null returns 'object' due to a historic JavaScript quirk.",
  },
  {
    id: 47,
    question: "Which operator is used to spread elements of an array or object?",
    options: ["...", "++", "--", "&&"],
    correctIndex: 0,
    explanation: "The spread operator '...' expands elements of arrays or objects.",
  },
  {
    id: 48,
    question: "What does 'async/await' do in JavaScript?",
    options: ["Makes functions asynchronous and waits for promises", "Makes functions synchronous", "Handles errors", "Defines variables"],
    correctIndex: 0,
    explanation: "async/await simplifies handling asynchronous code with promises.",
  },
  {
    id: 49,
    question: "Which HTML attribute binds a JavaScript event in JSX?",
    options: ["onClick", "onclick", "clickEvent", "handleClick"],
    correctIndex: 0,
    explanation: "In JSX, events are camelCase, e.g., onClick.",
  },
  {
    id: 50,
    question: "Which package manager uses a 'yarn.lock' file?",
    options: ["npm", "Yarn", "pnpm", "Bower"],
    correctIndex: 1,
    explanation: "Yarn uses yarn.lock to lock dependency versions.",
  },
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
    if (isCorrect) setScore((prev) => prev + 1);

    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentIndex] = { selected: selectedIndex, correct: currentQuestion.correctIndex };
      return newAnswers;
    });

    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      const prevAnswer = answers[currentIndex + 1]?.selected ?? null;
      setSelectedAnswer(prevAnswer);
      setShowFeedback(prevAnswer !== null);
    } else {
      setShowSummary(true);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex]);

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "700px",
        margin: "2rem auto",
        background: "#fdfdfd",
        borderRadius: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Segoe UI, sans-serif"
      }}
    >
      {!showSummary ? (
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1rem"
            }}
          >
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  const prevAnswer = answers[idx]?.selected ?? null;
                  setSelectedAnswer(prevAnswer);
                  setShowFeedback(prevAnswer !== null);
                }}
                style={{
                  padding: "0.4rem 0.8rem",
                  backgroundColor: idx === currentIndex ? "#30307d" : "#eee",
                  color: idx === currentIndex ? "#fff" : "#000",
                  borderRadius: "0.3rem",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  fontWeight: answers[idx] ? "bold" : "normal"
                }}
              >
                {idx + 1}
              </button>
            ))}
          </div>

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
                      padding: "0.75rem 1rem",
                      width: "100%",
                      backgroundColor: bgColor || "#f5f5f5",
                      border: "1px solid #ccc",
                      borderRadius: "0.5rem",
                      cursor: selectedAnswer === null ? "pointer" : "default",
                      transition: "background-color 0.3s ease",
                      fontSize: "1rem"
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
                  ? "Correct."
                  : `Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correctIndex]}`}
              </p>
              <p>
                <strong>Explanation:</strong> {currentQuestion.explanation}
              </p>
              <button onClick={handleNext}>Next</button>
            </>
          )}

          <p style={{ marginTop: "1rem" }}>
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
      ) : (
        <div>
          <h2>Thank you for completing the ACA Quiz!</h2>
          <p>
            Your score: {score} / {questions.length}
          </p>
          <h3>Summary:</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {questions.map((q, idx) => (
              <li key={q.id} style={{ marginBottom: "1rem" }}>
                <strong>Q{idx + 1}:</strong> {q.question}
                <br />
                <strong>Your answer:</strong>{" "}
                {q.options[answers[idx]?.selected] ?? "Not answered"}
                <br />
                <strong>Correct answer:</strong> {q.options[q.correctIndex]}
                <br />
                <strong>Explanation:</strong> {q.explanation}
              </li>
            ))}
          </ul>

          <button
            onClick={() => {
              setCurrentIndex(0);
              setScore(0);
              setAnswers([]);
              setShowSummary(false);
              setSelectedAnswer(null);
              setShowFeedback(false);
            }}
            style={{
              padding: "0.6rem 1.2rem",
              marginTop: "1rem",
              fontSize: "1rem",
              backgroundColor: "#30307d",
              color: "#fff",
              border: "none",
              borderRadius: "0.4rem",
              cursor: "pointer"
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
