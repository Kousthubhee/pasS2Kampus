import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume as VolumeUp, Languages, Copy, Check } from 'lucide-react';

const Translate: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [copied, setCopied] = useState(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');

        setSourceText(transcript);
        translateText(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }

    window.speechSynthesis.onvoiceschanged = () => {};
    return () => recognitionRef.current?.stop();
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition', error);
      }
    }
  };

  const translateText = async (text: string) => {
    if (!text.trim()) return;

    try {
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: 'fr',
          format: 'text',
        }),
      });

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error('LibreTranslate fetch error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setSourceText(text);
    translateText(text);
  };

  const speakText = (text: string) => {
    if (!text.trim()) return;

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text.trim());
    utterance.lang = 'fr-FR';

    const voices = synth.getVoices();
    const frenchVoice = voices.find((v) => v.lang.includes('fr'));
    if (frenchVoice) utterance.voice = frenchVoice;

    synth.cancel(); // Stop any ongoing speech
    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        const newVoices = window.speechSynthesis.getVoices();
        const newVoice = newVoices.find((v) => v.lang.includes('fr'));
        if (newVoice) utterance.voice = newVoice;
        synth.speak(utterance);
      };
    } else {
      synth.speak(utterance);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Voice Translator</h1>
        <p className="text-gray-600">
          Translate English to French in real-time. Speak or type to translate.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-800">English</h2>
              <button
                onClick={toggleListening}
                className={`p-2 rounded-full ${
                  isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-blue-100 text-blue-600'
                }`}
                aria-label={isListening ? 'Stop listening' : 'Start listening'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>

            <textarea
              value={sourceText}
              onChange={handleInputChange}
              placeholder="Speak or type here in English..."
              className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {isListening && (
              <div className="mt-2 text-sm text-red-600 flex items-center">
                <Mic className="w-4 h-4 mr-1 animate-pulse" />
                Listening... Speak now
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-800">French</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => speakText(translatedText)}
                  className="p-2 rounded-full bg-blue-100 text-blue-600"
                  aria-label="Speak translation"
                  disabled={!translatedText.trim()}
                >
                  <VolumeUp className="w-5 h-5" />
                </button>

                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-full bg-blue-100 text-blue-600"
                  aria-label="Copy translation"
                  disabled={!translatedText.trim()}
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="w-full h-40 p-3 border border-gray-300 rounded-md bg-gray-50 overflow-auto">
              {translatedText.trim() || (
                <span className="text-gray-400">Translation will appear here...</span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 border-t border-blue-100 flex items-center">
          <Languages className="w-5 h-5 text-blue-600 mr-3" />
          <div className="text-blue-700 text-sm">
            <strong>Pro Tip:</strong> Speak clearly in short sentences for better accuracy. This version
            uses the free LibreTranslate API.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translate;
