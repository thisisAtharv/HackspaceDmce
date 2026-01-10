// src/components/LearnView.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Brain, MessageSquare, Send, CheckCircle, XCircle } from 'lucide-react';

const Learn = () => {
  // --- QUIZ STATE ---
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const questions = [
    {
      question: "What is the largest planet in our Solar System?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Jupiter",
      fact: "Jupiter is so big that all the other planets could fit inside it!"
    },
    {
      question: "Which star is at the center of our Solar System?",
      options: ["Sirius", "Alpha Centauri", "The Sun", "Proxima"],
      answer: "The Sun",
      fact: "The Sun accounts for 99.86% of the mass in the solar system."
    },
    {
      question: "What causes a Solar Eclipse?",
      options: ["The Sun turns off", "The Moon passes between Earth and Sun", "Clouds cover the Sun", "Earth spins backward"],
      answer: "The Moon passes between Earth and Sun",
      fact: "A total solar eclipse can last up to 7.5 minutes."
    }
  ];

  const handleAnswer = (option) => {
    if (selectedOption) return;
    setSelectedOption(option);
    
    if (option === questions[currentQuestion].answer) {
      setIsCorrect(true);
      setScore(score + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const nextQuestion = () => {
    const nextQ = currentQuestion + 1;
    if (nextQ < questions.length) {
      setCurrentQuestion(nextQ);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowScore(true);
    }
  };

  // --- CHATBOT STATE ---
  const [messages, setMessages] = useState([
    { id: 1, text: "Greetings, Cadet! I am your AI Pilot. Ask me anything about the universe.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      let botText = "That's a complex cosmic phenomenon! Check the NASA archives for more.";
      const lowerInput = userMsg.text.toLowerCase();
      if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        botText = "Systems online! Ready to explore space?";
      } else if (lowerInput.includes("black hole")) {
        botText = "A black hole is a region of space where gravity is so strong that nothing, not even light, can escape it.";
      } else if (lowerInput.includes("mars")) {
        botText = "Mars is known as the Red Planet because of iron oxide (rust) on its surface. We plan to send humans there by the 2030s!";
      } else if (lowerInput.includes("sun")) {
        botText = "The Sun is a 4.5 billion-year-old yellow dwarf star. Without it, life on Earth wouldn't exist.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: "bot" }]);
    }, 1000);
  };

  return (
    // FIX 1: Use calc() to lock height specifically to the viewport minus header/padding
    <div className="grid-container" style={{ gridTemplateColumns: '1fr 1fr', height: 'calc(100vh - 180px)', minHeight: '500px' }}>
      
      {/* LEFT COLUMN: QUIZ MODULE */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', overflow: 'hidden' }}>
        <div className="card-title"><Brain size={18} /> Cadet Training Module</div>
        
        {/* Added overflow-y auto here too, just in case quiz content gets long on small screens */}
        <div style={{ overflowY: 'auto', paddingRight: '5px' }}>
            {showScore ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h2 style={{ fontSize: '3rem', color: '#4ade80' }}>{score} / {questions.length}</h2>
                <p style={{ color: '#cbd5e1' }}>Mission Complete!</p>
                <button 
                onClick={() => window.location.reload()}
                style={{ marginTop: '20px', padding: '10px 20px', background: '#06b6d4', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}
                >
                Restart Training
                </button>
            </div>
            ) : (
            <div>
                <div style={{ marginBottom: '20px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Question {currentQuestion + 1}/{questions.length}</span>
                <h3 style={{ fontSize: '1.4rem', marginTop: '10px' }}>{questions[currentQuestion].question}</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {questions[currentQuestion].options.map((option) => (
                    <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={selectedOption !== null}
                    style={{
                        padding: '15px',
                        textAlign: 'left',
                        background: selectedOption === option 
                        ? (option === questions[currentQuestion].answer ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)')
                        : 'rgba(255,255,255,0.05)',
                        border: selectedOption === option
                        ? (option === questions[currentQuestion].answer ? '1px solid #22c55e' : '1px solid #ef4444')
                        : '1px solid rgba(148, 163, 184, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
                        cursor: 'pointer',
                        transition: '0.2s'
                    }}
                    >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {option}
                        {selectedOption === option && (
                        option === questions[currentQuestion].answer 
                            ? <CheckCircle size={20} color="#4ade80" /> 
                            : <XCircle size={20} color="#ef4444" />
                        )}
                    </div>
                    </button>
                ))}
                </div>

                {selectedOption && (
                <div style={{ marginTop: '20px', animation: 'fadeIn 0.5s' }}>
                    <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #06b6d4', marginBottom: '15px' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#a5f3fc' }}>💡 <strong>Fact:</strong> {questions[currentQuestion].fact}</p>
                    </div>
                    <button 
                    onClick={nextQuestion}
                    style={{ width: '100%', padding: '12px', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                    Next Question
                    </button>
                </div>
                )}
            </div>
            )}
        </div>
      </div>

      {/* RIGHT COLUMN: AI ASSISTANT */}
      {/* FIX 2: Strict Flex Column with hidden overflow on parent, auto overflow on child */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        <div className="card-title" style={{ flexShrink: 0 }}><MessageSquare size={18} /> AI Captain (Beta)</div>
        
        {/* Chat Messages Area */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          minHeight: 0, // This is CRITICAL for flex containers to scroll
          paddingRight: '10px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '15px',
          marginBottom: '15px'
        }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%', flexShrink: 0 }}>
              <div style={{ 
                background: msg.sender === 'user' ? '#06b6d4' : 'rgba(255,255,255,0.1)',
                color: 'white',
                padding: '12px 16px',
                borderRadius: msg.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                fontSize: '0.95rem',
                lineHeight: '1.5'
              }}>
                {msg.text}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                {msg.sender === 'user' ? 'You' : 'AI Pilot'}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about stars, planets..."
            style={{ 
              flex: 1, 
              background: 'rgba(0,0,0,0.3)', 
              border: '1px solid rgba(148, 163, 184, 0.3)', 
              borderRadius: '8px',
              padding: '12px',
              color: 'white',
              outline: 'none'
            }} 
          />
          <button type="submit" style={{ background: '#06b6d4', border: 'none', borderRadius: '8px', width: '50px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Send size={20} />
          </button>
        </form>
      </div>

    </div>
  );
};

export default Learn;