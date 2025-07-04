import React, { useState, useEffect } from "react";
import { db } from "./../firebase";
import { collection, getDocs } from "firebase/firestore";

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

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "questions"));
        const fetchedQuestions: Question[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: data.id,
            question: data.question,
            options: data.options,
            correctIndex: data.correctIndex,
            explanation: data.explanation,
          };
        });
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex]);

  useEffect(() => {
    const prevAnswer = answers[currentIndex]?.selected ?? null;
    setSelectedAnswer(prevAnswer);
    setShowFeedback(prevAnswer !== null);
  }, [currentIndex, answers]);

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (questions.length === 0) {
    return <p>No questions found.</p>;
  }

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (selectedIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(selectedIndex);
    const isCorrect = selectedIndex === currentQuestion.correctIndex;
    if (isCorrect) setScore((prev) => prev + 1);

    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentIndex] = {
        selected: selectedIndex,
        correct: currentQuestion.correctIndex,
      };
      return newAnswers;
    });

    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "700px",
        margin: "2rem auto",
        background: "#fdfdfd",
        borderRadius: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {!showSummary ? (
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  padding: "0.4rem 0.8rem",
                  backgroundColor: idx === currentIndex ? "#30307d" : "#eee",
                  color: idx === currentIndex ? "#fff" : "#000",
                  borderRadius: "0.3rem",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  fontWeight: answers[idx] ? "bold" : "normal",
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
                      fontSize: "1rem",
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
              cursor: "pointer",
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
