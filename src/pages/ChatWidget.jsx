import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, RefreshCw, AlertCircle } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  
  // Steps: 0=Start, 1=Name, 2=Phone, 3=Email, 4=Service, 5=End
  const [step, setStep] = useState(0); 

  // Start with EMPTY messages for the "Real Typing" effect
  const [messages, setMessages] = useState([]);
  
  // Ref to track if greeting has already started
  const hasGreeted = useRef(false); 
  const messagesEndRef = useRef(null);

  // 1. Popup Hint (Show after 3 seconds if not opened)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowPopup(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // 2. Real Typing Simulation on First Open
  useEffect(() => {
    if (isOpen && !hasGreeted.current) {
      hasGreeted.current = true; // Mark as started
      triggerGreetingSequence();
    }
    // eslint-disable-next-line
  }, [isOpen]);

  // Function to simulate bot typing delay
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const triggerGreetingSequence = async () => {
    // Msg 1
    setIsTyping(true);
    await wait(1500); // 1.5 sec typing
    addBotMessage("Hello! I am Vadic. Nice to meet you.");
    
    // Msg 2
    setIsTyping(true);
    await wait(1200); // 1.2 sec typing
    addBotMessage("Welcome to ThinkNEXT Technologies.");

    // Msg 3 (Question)
    setIsTyping(true);
    await wait(1200); 
    addBotMessage("What's your Good Name?");
    setIsTyping(false);
  };

  const addBotMessage = (text, isOptions = false) => {
    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'bot', isOptions }]);
  };

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  // --- VALIDATION & SEND LOGIC ---
  const validateInput = (val) => {
    if (!val.trim()) return "Please enter a value.";
    if (step === 0 && val.length < 3) return "Please enter a valid name.";
    if (step === 1 && !/^[0-9]{10}$/.test(val)) return "Please enter a valid 10-digit number.";
    if (step === 2 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Please enter a valid email.";
    return "";
  };

  const handleSend = () => {
    const validationError = validateInput(inputValue);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    
    // Add User Message
    const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    
    // Trigger Bot Response
    setIsTyping(true);
    processBotResponse(inputValue);
  };

  const handleOptionSelect = (option) => {
    const userMsg = { id: Date.now(), text: option, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    processBotResponse(option);
  };

  const processBotResponse = (inputData) => {
    setTimeout(() => {
      let botText = "";
      let nextStep = step + 1;
      let isOptionStep = false;

      switch (step) {
        case 0:
          botText = `Nice to meet you, ${inputData}! Please share your 10-digit mobile number.`;
          break;
        case 1:
          botText = "Great! Now, what's your email address?";
          break;
        case 2:
          botText = "Which Product/Service you are looking for?";
          isOptionStep = true;
          break;
        case 3:
          botText = "Thank you! Our team will contact you shortly.";
          nextStep = 4;
          break;
        default:
          setIsTyping(false);
          return;
      }

      addBotMessage(botText, isOptionStep);
      setStep(nextStep);
      setIsTyping(false); 
    }, 1500); 
  };

  const serviceOptions = ["Digital Marketing", "Web Development", "App Development", "Industrial Training", "Others"];

  return (
    // Container: Fixed at bottom-right. Responsive padding.
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end font-sans">
      
      {/* Styles for Animations & Typing Dot */}
      <style>{`
        @keyframes messagePop { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes typingBounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-4px); } }
        .animate-msg { animation: messagePop 0.3s ease-out forwards; }
        .typing-dot { animation: typingBounce 1.2s infinite ease-in-out both; }
        .typing-dot:nth-child(1) { animation-delay: 0s; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      {/* --- Popup Hint (Vadic) --- */}
      {!isOpen && showPopup && (
        <div className="mb-3 sm:mb-4 bg-black text-white p-3 sm:p-4 rounded-xl shadow-2xl relative max-w-[240px] sm:max-w-[260px] animate-msg flex items-center gap-3">
          <button 
            onClick={() => setShowPopup(false)}
            className="absolute -top-2 -left-2 bg-gray-200 text-black rounded-full p-1 shadow-md hover:bg-gray-300"
          >
            <X size={12} />
          </button>
          <div className="flex-1">
             <div className="text-xs sm:text-sm font-medium">Hi! I am Vadic. Need help?</div>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800 overflow-hidden border border-gray-600">
             <User className="w-full h-full p-2 text-gray-400" />
          </div>
        </div>
      )}

      {/* --- Toggle Button --- */}
      {!isOpen && (
        <button 
          onClick={() => { setIsOpen(true); setShowPopup(false); }}
          className="group bg-black hover:bg-gray-900 transition-all duration-300 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95"
        >
          <MessageCircle color="white" size={28} className="sm:w-8 sm:h-8 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute top-0 right-0 bg-white text-black text-[10px] sm:text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border-2 border-black">1</span>
        </button>
      )}

      {/* --- Chat Window (Responsive) --- */}
      {/* Width: Mobile=calc(100vw-32px), Desktop=360px */}
      {/* Height: Mobile=calc(100vh-100px), Desktop=580px */}
      {isOpen && (
        <div className="
            w-[calc(100vw-32px)] sm:w-[360px] 
            h-[calc(100vh-100px)] sm:h-[580px] 
            bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden 
            border border-gray-200 animate-msg
        ">
          
          {/* Header */}
          <div className="bg-black p-4 sm:p-5 flex items-center justify-between text-white shadow-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-800 flex items-center justify-center border-2 border-gray-600">
                  <User size={20} className="sm:w-6 sm:h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-black"></span>
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base tracking-wide">Vadic AI</h3>
                <p className="text-[10px] sm:text-xs text-gray-400">Online | Replies instantly</p>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4">
              <RefreshCw size={18} className="cursor-pointer text-gray-400 hover:text-white transition" 
                onClick={() => { 
                  setMessages([]); 
                  setStep(0); 
                  hasGreeted.current = false; // Reset greeting logic
                  setTimeout(() => triggerGreetingSequence(), 500); // Restart greeting
                }}
              />
              <X size={22} className="cursor-pointer text-gray-400 hover:text-white transition sm:w-6 sm:h-6" onClick={() => setIsOpen(false)} />
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-gray-50 space-y-4 sm:space-y-5 scrollbar-thin scrollbar-thumb-gray-300">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col animate-msg ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                
                {msg.text && (
                  <div className={`max-w-[85%] p-3 text-sm sm:text-[15px] leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-black text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                )}

                {/* Options Buttons */}
                {msg.isOptions && step === 3 && !isTyping && (
                   <div className="mt-3 flex flex-col gap-2 w-full animate-msg">
                     {serviceOptions.map((option, idx) => (
                       <button 
                         key={idx}
                         onClick={() => handleOptionSelect(option)}
                         className="w-full text-left border border-gray-300 bg-white hover:bg-black hover:text-white hover:border-black text-gray-700 text-xs sm:text-sm py-2.5 px-3 sm:py-3 sm:px-4 rounded-xl transition-all duration-200 font-medium"
                       >
                         {option}
                       </button>
                     ))}
                   </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start animate-msg">
                <div className="bg-white border border-gray-200 p-3 sm:p-4 rounded-2xl rounded-tl-sm flex gap-1 items-center h-8 sm:h-10 shadow-sm">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full typing-dot"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full typing-dot"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full typing-dot"></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          {step !== 3 && step !== 4 && (
            <div className="p-3 sm:p-4 bg-white border-t border-gray-100 shrink-0">
              {error && (
                <div className="mb-2 text-xs text-red-600 flex items-center gap-1 animate-msg">
                  <AlertCircle size={12} /> {error}
                </div>
              )}
              
              <div className={`relative flex items-center transition-all ${error ? 'shake-animation' : ''}`}>
                <input
                  type="text"
                  placeholder={
                    step === 0 ? "Type your name..." : 
                    step === 1 ? "Enter 10-digit mobile..." : 
                    "Type your message..."
                  }
                  className={`w-full bg-gray-50 border ${error ? 'border-red-400 bg-red-50' : 'border-gray-200'} rounded-xl py-3 pl-3 pr-10 text-sm sm:py-3.5 sm:pl-4 sm:pr-12 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all`}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if(error) setError('');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={`absolute right-2 p-1.5 sm:p-2 rounded-lg transition-all ${
                    inputValue.trim() ? 'bg-black text-white hover:scale-105' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
              <div className="text-center mt-2 sm:mt-3">
                <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Powered by ThinkNEXT</span>
              </div>
            </div>
          )}
          
        </div>
      )}
    </div>
  );
};

export default ChatWidget;