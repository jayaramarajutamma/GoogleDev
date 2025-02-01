import React, { useState } from 'react';
import './Chatbot.css'; // Make sure to add the CSS for the floating effect

// Chatbot Component
const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [recognition, setRecognition] = useState(null); // Store the SpeechRecognition instance
  const [currentSpeech, setCurrentSpeech] = useState(null); // Track current speech instance

  // Function to send message to the Flask backend
  async function sendMessage(message) {
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: 'You', text: message }
    ]);

    const response = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const result = await response.json();
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: 'AI', text: result.response }
    ]);
    speakText(result.response);  // Speak response
  }

  // Text-to-Speech function
  function speakText(text, lang = "te-IN") {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = lang;
    speech.rate = 1;

    // Set the current speech to this speech instance
    setCurrentSpeech(speech);
    window.speechSynthesis.speak(speech);
  }

  // Speech-to-Text (Voice Input)
  function startVoiceInput() {
    const recognitionInstance = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognitionInstance.lang = "te-IN";  // Telugu language recognition
    setRecognition(recognitionInstance); // Store the recognition instance in state

    recognitionInstance.onresult = function(event) {
      const voiceInput = event.results[0][0].transcript;
      setUserInput(voiceInput);
      sendMessage(voiceInput);
    };

    recognitionInstance.start();
  }

  // Stop Voice Recognition
  function stopVoiceInput() {
    if (recognition) {
      recognition.stop(); // Stop the voice recognition
    }
  }

  // Stop the speech output
  function stopSpeech() {
    if (currentSpeech) {
      window.speechSynthesis.cancel(); // Stop the current speech
    }
  }

  // Handle Send Button
  const handleSend = () => {
    if (userInput) {
      sendMessage(userInput);
      setUserInput('');
    }
  };

  // Toggle chat window open/close
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      {/* Floating Chat Icon */}
      <div className="chat-bubble" onClick={toggleChat}>
        💬
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="chat-container">
          <div className="chatbox">
            {chatHistory.map((message, index) => (
              <p key={index}><strong>{message.sender}:</strong> {message.text}</p>
            ))}
          </div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type or speak your question..."
          />
          <button onClick={handleSend}>Send</button>
          <button onClick={startVoiceInput}>🎤 Speak</button>
          <button onClick={stopSpeech}>Stop Speech</button>
          <button onClick={stopVoiceInput}>Stop Voice Input</button>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
