import React, { useState, useRef, useEffect } from 'react';
import { Brain, MessageSquare, Send, CheckCircle, XCircle, ChevronLeft } from 'lucide-react'; // Icons for the Quiz Mode
import { quizzes, quizData } from '../data/mockData';

const Learn = () => {
  // --- STATE FOR VIEW SWITCHING ---
  const [activeQuiz, setActiveQuiz] = useState(null);

  // --- QUIZ LOGIC STATES ---
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // --- CHAT LOGIC STATES ---
  const [messages, setMessages] = useState([
    { id: 1, text: "Greetings, Cadet! I am your AI Pilot. While you take this quiz, ask me anything if you get stuck.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Helper to get questions safely
  const currentQuestions = activeQuiz ? (quizData[activeQuiz] || quizData["default"]) : [];

  // --- LOGIC FUNCTIONS ---
  const handleStartQuiz = (category) => {
    setActiveQuiz(category);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleAnswer = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);

    if (option === currentQuestions[currentQuestion].answer) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const nextQuestion = () => {
    const nextQ = currentQuestion + 1;
    if (nextQ < currentQuestions.length) {
      setCurrentQuestion(nextQ);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowScore(true);
    }
  };

  // Chat Auto-scroll
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // Chat Send Logic
  // Updated Chat Logic for Demo Video
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Add User Message
    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // 2. Simulate AI Response with Predefined Answers
    setTimeout(() => {
      const lowerInput = userMsg.text.toLowerCase();
      let botText = "I am processing that data... Try asking about planets, stars, or mission history.";

      // --- SCRIPTED DEMO RESPONSES ---

      // Q1: What is a black hole?
      if (lowerInput.includes("black hole")) {
        botText = "A black hole is a region of space where gravity is so strong that nothing, not even light, can escape it. They are often formed when massive stars collapse.";
      }

      // Q2: Why is Mars red?
      else if (lowerInput.includes("mars") && lowerInput.includes("red")) {
        botText = "Mars appears red because of iron oxide (rust) covering its surface. The dust gets kicked up into the atmosphere, making the whole planet look reddish-orange.";
      }
      // General Mars query
      else if (lowerInput.includes("mars")) {
        botText = "Mars is the fourth planet from the Sun. It is a cold, desert world with a very thin atmosphere.";
      }

      // Q3: Who was the first human in space?
      else if (lowerInput.includes("first human") || lowerInput.includes("yuri")) {
        botText = "Yuri Gagarin, a Soviet pilot, became the first human in space on April 12, 1961, aboard the Vostok 1 spacecraft.";
      }

      // Q4: How big is the Sun?
      else if (lowerInput.includes("sun") && (lowerInput.includes("big") || lowerInput.includes("size"))) {
        botText = "The Sun is huge! Its diameter is about 1.4 million km (109 times Earth). You could fit 1.3 million Earths inside it.";
      }

      // Q5: What is gravity?
      else if (lowerInput.includes("gravity")) {
        botText = "Gravity is the force by which a planet or other body draws objects toward its center. It keeps all the planets in orbit around the Sun.";
      }

      // Q6: What is the ISS?
      else if (lowerInput.includes("iss") || lowerInput.includes("space station")) {
        botText = "The International Space Station (ISS) is a modular space station in low Earth orbit. It travels at about 28,000 km/h!";
      }

      // Q7: Hint functionality (Dynamic based on current quiz question)
      else if (lowerInput.includes("hint") || lowerInput.includes("help")) {
        botText = `Here is a hint for the current question: ${currentQuestions[currentQuestion].fact}`;
      }

      // Q8: Greetings
      else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        botText = "Greetings, Captain! Systems are online. I am ready to assist with your training.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: "bot" }]);
    }, 1000); // 1 second delay to feel "real"
  };

  // --- HELPER FOR YOUR UI (DIFFICULTY DOTS) ---
  const getDifficultyDots = (difficulty) => {
    return (
      <div className={`quiz-difficulty ${difficulty}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    );
  };

  // =========================================================
  // VIEW 1: ACTIVE QUIZ MODE (Split Screen)
  // =========================================================
  if (activeQuiz) {
    return (
      <div className="dashboard-page" style={{ height: 'calc(100vh - 100px)' }}>
        {/* Header with Back Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
          <button className="btn btn-secondary" onClick={() => setActiveQuiz(null)}>
            <ChevronLeft size={16} /> Exit Module
          </button>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{activeQuiz}: Training Module</h2>
        </div>

        <div className="grid-2" style={{ height: '100%', gap: '20px' }}>

          {/* LEFT: Question Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>

            {showScore ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ width: '80px', height: '80px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle size={40} color="#22c55e" />
                </div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{score} / {currentQuestions.length}</h2>
                <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Training Complete. Great work, Cadet!</p>
                <button className="btn btn-primary" onClick={() => setActiveQuiz(null)}>Return to Academy</button>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                  <span className="badge badge-info">QUESTION {currentQuestion + 1} OF {currentQuestions.length}</span>
                  <span style={{ color: '#94a3b8', fontSize: '13px' }}>Score: {score}</span>
                </div>

                <h3 style={{ fontSize: '1.4rem', lineHeight: '1.4', marginBottom: '30px' }}>
                  {currentQuestions[currentQuestion].question}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {currentQuestions[currentQuestion].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      disabled={selectedOption !== null}
                      style={{
                        padding: '16px',
                        textAlign: 'left',
                        background: selectedOption === option
                          ? (option === currentQuestions[currentQuestion].answer ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)')
                          : 'rgba(255,255,255,0.03)',
                        border: selectedOption === option
                          ? (option === currentQuestions[currentQuestion].answer ? '1px solid #22c55e' : '1px solid #ef4444')
                          : '1px solid #334155',
                        borderRadius: '8px',
                        color: 'white',
                        cursor: 'pointer',
                        transition: '0.2s',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      {option}
                      {selectedOption === option && (
                        option === currentQuestions[currentQuestion].answer
                          ? <CheckCircle size={18} color="#4ade80" />
                          : <XCircle size={18} color="#ef4444" />
                      )}
                    </button>
                  ))}
                </div>

                {selectedOption && (
                  <div style={{ marginTop: '250px', paddingTop: '20px', animation: 'fadeIn 0.3s' }}>
                    <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '15px', borderRadius: '8px', borderLeft: '3px solid #06b6d4', marginBottom: '20px' }}>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#a5f3fc' }}>
                        💡 <strong>Fact:</strong> {currentQuestions[currentQuestion].fact}
                      </p>
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={nextQuestion}>
                      Next Question
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* RIGHT: AI Assistant */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '90%', overflow: 'hidden' }}>
            <div className="card-header">
              <div className="card-icon purple"><MessageSquare size={18} /></div>
              <span className="card-title">AI Tutor</span>
            </div>

            {/* Chat History */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                  <div style={{
                    background: msg.sender === 'user' ? '#2563eb' : 'rgba(255,255,255,0.1)',
                    padding: '12px 16px',
                    borderRadius: msg.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* NEW: PRESET CHIPS AREA */}
            <div style={{ padding: '0 10px', marginBottom: '10px', display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' }}>
              {[
                "Give me a hint!",
                "Who was Yuri Gagarin?",
                "How big is the Sun?",
                "Tell me a space fact"
              ].map((text, i) => (
                <button
                  key={i}
                  onClick={() => {
                    // 1. Create User Msg
                    const userMsg = { id: Date.now(), text: text, sender: "user" };
                    setMessages(prev => [...prev, userMsg]);

                    // 2. Trigger Bot Reply
                    setTimeout(() => {
                      let botText = "That's a great question! The cosmos is full of mysteries.";
                      if (text.includes("hint")) botText = `Hint: ${currentQuestions[currentQuestion].fact}`;
                      else if (text.includes("Mars")) botText = "Mars is red because of iron oxide (rust) on its surface.";
                      else if (text.includes("Black Hole")) botText = "A black hole is a region where gravity is so strong even light cannot escape.";

                      setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: "bot" }]);
                    }, 1000);
                  }}
                  style={{
                    background: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    color: '#a5f3fc',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: '0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.background = 'rgba(6, 182, 212, 0.2)'}
                  onMouseOut={(e) => e.target.style.background = 'rgba(6, 182, 212, 0.1)'}
                >
                  {text}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} style={{ marginTop: '0', display: 'flex', gap: '10px', borderTop: '1px solid #334155', paddingTop: '15px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for a hint..."
                style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid #334155', borderRadius: '8px', padding: '10px', color: 'white', outline: 'none' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '0 15px' }}>
                <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================
  // VIEW 2: COURSE LIST (YOUR ORIGINAL DESIGN)
  // =========================================================
  return (
    <div className="learn-page">
      <div className="page-header">
        <h1 className="page-title">Space Academy</h1>
        <p className="page-subtitle">Expand your cosmic knowledge with interactive quizzes</p>
      </div>

      <div className="grid-3">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-card">
            <div className="quiz-category">{quiz.category}</div>
            <h3 className="quiz-title">{quiz.title}</h3>
            <p className="quiz-description">{quiz.description}</p>

            <div className="quiz-meta">
              <div className="quiz-meta-item">
                ❓ {quiz.questions} Questions
              </div>
              <div className="quiz-meta-item">
                ⏱️ {quiz.duration}
              </div>
              <div className="quiz-meta-item">
                {getDifficultyDots(quiz.difficulty)}
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--space-border)',
              paddingTop: '16px',
              marginTop: '8px'
            }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                👥 {quiz.completedBy.toLocaleString()} completed
              </span>
              <button
                className="btn btn-primary"
                onClick={() => handleStartQuiz(quiz.category)} // <--- THIS MAKES IT WORK
              >
                Start Quiz
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Resources (Kept exactly as you had them) */}
      <div className="card" style={{ marginTop: '32px' }}>
        <div className="card-header">
          <div className="card-icon purple">🎓</div>
          <div className="card-title">Learning Resources</div>
        </div>
        <div className="grid-4" style={{ marginTop: '20px' }}>
          <div className="event-card">
            <div className="event-date">VIDEO COURSE</div>
            <div className="event-name">Introduction to Astrophysics</div>
            <div className="event-description">12 lectures • 6 hours</div>
          </div>
          <div className="event-card">
            <div className="event-date">E-BOOK</div>
            <div className="event-name">The Cosmos Explained</div>
            <div className="event-description">PDF • 245 pages</div>
          </div>
          <div className="event-card">
            <div className="event-date">PODCAST</div>
            <div className="event-name">Space Stories Weekly</div>
            <div className="event-description">Audio • 52 episodes</div>
          </div>
          <div className="event-card">
            <div className="event-date">INTERACTIVE</div>
            <div className="event-name">Virtual Planetarium</div>
            <div className="event-description">3D Experience</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;