import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Languages, Mic, VolumeX, Volume2, ArrowRightLeft, Copy, Check } from 'lucide-react';
import Button from '../../components/ui/Button';

const TranslatePage: React.FC = () => {
  const [fromLanguage, setFromLanguage] = useState<'en' | 'fr'>('en');
  const [toLanguage, setToLanguage] = useState<'en' | 'fr'>('fr');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Sample translations for demo
  const sampleTranslations: Record<string, Record<string, string>> = {
    en: {
      'Hello': 'Bonjour',
      'How are you?': 'Comment allez-vous?',
      'My name is': 'Je m\'appelle',
      'Thank you': 'Merci',
      'Excuse me': 'Excusez-moi',
      'Where is the bathroom?': 'Où sont les toilettes?',
      'I would like to order': 'Je voudrais commander',
      'How much does it cost?': 'Combien ça coûte?',
      'I don\'t understand': 'Je ne comprends pas',
      'Can you help me?': 'Pouvez-vous m\'aider?',
    },
    fr: {
      'Bonjour': 'Hello',
      'Comment allez-vous?': 'How are you?',
      'Je m\'appelle': 'My name is',
      'Merci': 'Thank you',
      'Excusez-moi': 'Excuse me',
      'Où sont les toilettes?': 'Where is the bathroom?',
      'Je voudrais commander': 'I would like to order',
      'Combien ça coûte?': 'How much does it cost?',
      'Je ne comprends pas': 'I don\'t understand',
      'Pouvez-vous m\'aider?': 'Can you help me?',
    }
  };
  
  // Translate text (mock implementation)
  const translateText = () => {
    if (!inputText.trim()) return;
    
    // Check if we have an exact match in our sample translations
    if (sampleTranslations[fromLanguage][inputText]) {
      setOutputText(sampleTranslations[fromLanguage][inputText]);
      return;
    }
    
    // Otherwise do a simple "translation" for demo purposes
    if (fromLanguage === 'en' && toLanguage === 'fr') {
      setOutputText(`[Translated to French]: ${inputText}`);
    } else {
      setOutputText(`[Translated to English]: ${inputText}`);
    }
  };
  
  // Swap languages
  const swapLanguages = () => {
    setFromLanguage(fromLanguage === 'en' ? 'fr' : 'en');
    setToLanguage(toLanguage === 'en' ? 'fr' : 'en');
    setInputText(outputText);
    setOutputText('');
  };
  
  // Start speech recognition (mock implementation)
  const startListening = () => {
    setIsListening(true);
    
    // In a real app, this would use the Web Speech API
    // For this demo, just simulate speech recognition after a delay
    setTimeout(() => {
      if (fromLanguage === 'en') {
        setInputText('Can you help me?');
      } else {
        setInputText('Pouvez-vous m\'aider?');
      }
      setIsListening(false);
    }, 2000);
  };
  
  // Text-to-speech function
  const speakText = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-US' : 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };
  
  // Copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container"
    >
      <div className="section-title">
        <Languages size={24} />
        Speak & Translate
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
          <h2 className="text-xl font-bold mb-2">Real-time Translation</h2>
          <p className="text-sm opacity-90">
            Translate between French and English to help you communicate effectively.
            Use the microphone for speech recognition or type directly.
          </p>
        </div>
        
        <div className="p-6">
          {/* Language selector */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-500 mb-1">From</h3>
              <select
                value={fromLanguage}
                onChange={(e) => setFromLanguage(e.target.value as 'en' | 'fr')}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
            </div>
            
            <div className="mx-4">
              <button
                onClick={swapLanguages}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ArrowRightLeft size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-500 mb-1">To</h3>
              <select
                value={toLanguage}
                onChange={(e) => setToLanguage(e.target.value as 'en' | 'fr')}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
            </div>
          </div>
          
          {/* Input text */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">
                {fromLanguage === 'en' ? 'English' : 'French'}
              </h3>
              <div className="flex items-center">
                <button
                  onClick={() => speakText(inputText, fromLanguage)}
                  className="p-2 rounded-full hover:bg-gray-100 mr-2"
                  disabled={!inputText}
                >
                  <Volume2 size={18} className={`${!inputText ? 'text-gray-300' : 'text-gray-600'}`} />
                </button>
                <button
                  onClick={startListening}
                  className={`p-2 rounded-full ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'hover:bg-gray-100 text-gray-600'}`}
                  disabled={isListening}
                >
                  <Mic size={18} />
                </button>
              </div>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Type in ${fromLanguage === 'en' ? 'English' : 'French'}...`}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
              disabled={isListening}
            ></textarea>
          </div>
          
          <Button
            onClick={translateText}
            fullWidth
            className="mb-4"
          >
            Translate
          </Button>
          
          {/* Output text */}
          {outputText && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">
                  {toLanguage === 'en' ? 'English' : 'French'}
                </h3>
                <div className="flex items-center">
                  <button
                    onClick={() => speakText(outputText, toLanguage)}
                    className="p-2 rounded-full hover:bg-gray-100 mr-2"
                  >
                    <Volume2 size={18} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => copyToClipboard(outputText)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    {copied ? (
                      <Check size={18} className="text-green-600" />
                    ) : (
                      <Copy size={18} className="text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
              <div className="w-full min-h-32 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-gray-800">{outputText}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-700 mb-2">Common Phrases</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setInputText(fromLanguage === 'en' ? 'Excuse me' : 'Excusez-moi');
                translateText();
              }}
              className="bg-white border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {fromLanguage === 'en' ? 'Excuse me' : 'Excusez-moi'}
            </button>
            <button
              onClick={() => {
                setInputText(fromLanguage === 'en' ? 'Thank you' : 'Merci');
                translateText();
              }}
              className="bg-white border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {fromLanguage === 'en' ? 'Thank you' : 'Merci'}
            </button>
            <button
              onClick={() => {
                setInputText(fromLanguage === 'en' ? 'Where is the bathroom?' : 'Où sont les toilettes?');
                translateText();
              }}
              className="bg-white border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {fromLanguage === 'en' ? 'Where is the bathroom?' : 'Où sont les toilettes?'}
            </button>
            <button
              onClick={() => {
                setInputText(fromLanguage === 'en' ? 'How much does it cost?' : 'Combien ça coûte?');
                translateText();
              }}
              className="bg-white border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {fromLanguage === 'en' ? 'How much does it cost?' : 'Combien ça coûte?'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TranslatePage;