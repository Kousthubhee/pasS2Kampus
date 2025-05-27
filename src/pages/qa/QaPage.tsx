import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Volume2, User, Bot } from 'lucide-react';
import Button from '../../components/ui/Button';

const QaPage: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      text: "Hello! I'm your pasS2Kampus assistant. Ask me anything about studying in France!",
      isUser: false,
      timestamp: new Date().toISOString(),
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  
  const sampleQuestions = [
    "How to apply for CAF?",
    "What documents do I need for a visa?",
    "How to open a bank account in France?",
    "What food items can I bring from India?",
  ];
  
  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text,
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      let responseText = '';
      
      // Simple response logic based on keywords
      if (text.toLowerCase().includes('caf')) {
        responseText = "To apply for CAF (housing assistance), you'll need: a French bank account, housing contract, passport, visa, proof of enrollment, and birth certificate. Apply online at caf.fr after arrival.";
      } else if (text.toLowerCase().includes('visa') || text.toLowerCase().includes('document')) {
        responseText = "For a student visa, you'll need: acceptance letter, Campus France validation, passport, financial proof (€615/month), accommodation proof, health insurance, and application fees.";
      } else if (text.toLowerCase().includes('bank account')) {
        responseText = "To open a bank account in France: Choose a bank (BNP, Société Générale, etc.), schedule an appointment, bring passport, visa, enrollment proof, and residence proof. Online banks like Boursorama are also popular.";
      } else if (text.toLowerCase().includes('food')) {
        responseText = "You can bring packaged foods like spices, pickles, and snacks. Avoid fresh produce, meat, and dairy. Check customs regulations as quantities may be limited.";
      } else {
        responseText = "Thank you for your question! I'll do my best to help you with information about studying in France. Could you provide more details or ask a more specific question?";
      }
      
      const botMessage = {
        id: Date.now(),
        text: responseText,
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  const handleSampleQuestionClick = (question: string) => {
    setInputValue(question);
    handleSendMessage(question);
  };
  
  const handleTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container"
    >
      <div className="section-title">
        <MessageSquare size={24} />
        Ask Me Anything
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Sample questions */}
        <div className="bg-primary-50 p-4 border-b border-primary-100">
          <h3 className="font-semibold text-primary-700 mb-3">Common Questions</h3>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSampleQuestionClick(question)}
                className="bg-white border border-primary-200 rounded-full px-3 py-1 text-sm text-primary-700 hover:bg-primary-100 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
        
        {/* Chat messages */}
        <div className="h-[400px] overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? 'bg-primary-100 text-primary-900'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-center mb-1">
                  <div className="p-1 rounded-full mr-2">
                    {message.isUser ? (
                      <User size={16} className="text-primary-600" />
                    ) : (
                      <Bot size={16} className="text-gray-600" />
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  {!message.isUser && (
                    <button
                      onClick={() => handleTextToSpeech(message.text)}
                      className="ml-2 p-1 rounded-full hover:bg-gray-200"
                      title="Text to speech"
                    >
                      <Volume2 size={14} className="text-gray-600" />
                    </button>
                  )}
                </div>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Chat input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your question here..."
              className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
            />
            <Button
              onClick={() => handleSendMessage()}
              className="rounded-l-none"
              rightIcon={<Send size={16} />}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QaPage;