import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Volume2, Check, ChevronDown, ChevronUp, Play } from 'lucide-react';
import Button from '../../components/ui/Button';

interface Lesson {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  flashcards: Flashcard[];
}

interface Flashcard {
  id: number;
  french: string;
  english: string;
  example: string;
  audio?: string;
}

const LanguagePage: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string | null>('greetings');
  const [expandedLesson, setExpandedLesson] = useState<number | null>(1);
  const [activeFlashcard, setActiveFlashcard] = useState<number | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
    }
  };

  const modules = [
    {
      id: 'greetings',
      title: 'Greetings & Introductions',
      icon: '👋',
      lessons: [
        {
          id: 1,
          title: 'Basic Greetings',
          description: 'Learn essential greetings to start conversations in French',
          completed: false,
          flashcards: [
            { id: 1, french: 'Bonjour', english: 'Hello / Good day', example: 'Bonjour, comment allez-vous?' },
            { id: 2, french: 'Bonsoir', english: 'Good evening', example: 'Bonsoir, je m\'appelle Marc.' },
            { id: 3, french: 'Au revoir', english: 'Goodbye', example: 'Au revoir, à demain!' },
            { id: 4, french: 'Salut', english: 'Hi / Bye (informal)', example: 'Salut, ça va?' }
          ]
        },
        {
          id: 2,
          title: 'Introducing Yourself',
          description: 'Learn how to introduce yourself and ask basic questions',
          completed: false,
          flashcards: [
            { id: 5, french: 'Je m\'appelle...', english: 'My name is...', example: 'Je m\'appelle Sophie.' },
            { id: 6, french: 'Comment vous appelez-vous?', english: 'What is your name? (formal)', example: 'Bonjour, comment vous appelez-vous?' },
            { id: 7, french: 'Comment tu t\'appelles?', english: 'What is your name? (informal)', example: 'Salut, comment tu t\'appelles?' },
            { id: 8, french: 'Enchanté(e)', english: 'Pleased to meet you', example: 'Je m\'appelle Pierre. Enchanté!' }
          ]
        }
      ]
    }
  ];

  const currentModule = modules.find(m => m.id === activeModule);

  const toggleLesson = (lessonId: number) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
    setActiveFlashcard(null);
    setShowTranslation(false);
  };

  const handleFlashcardClick = (cardId: number) => {
    setActiveFlashcard(cardId);
    setShowTranslation(false);
  };

  const getCurrentFlashcard = () => {
    if (!currentModule || expandedLesson === null || activeFlashcard === null) return null;
    const lesson = currentModule.lessons.find(l => l.id === expandedLesson);
    if (!lesson) return null;
    return lesson.flashcards.find(f => f.id === activeFlashcard);
  };

  const currentFlashcard = getCurrentFlashcard();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-container">
      <div className="section-title">
        <BookOpen size={24} /> Learn Basic French
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 bg-primary-50 border-b border-primary-100">
              <h2 className="font-semibold text-primary-800">A1 French Modules</h2>
              <p className="text-sm text-primary-600">Essential phrases for daily life</p>
            </div>

            <div className="p-2">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveModule(module.id);
                    setExpandedLesson(module.lessons[0]?.id || null);
                    setActiveFlashcard(null);
                    setShowTranslation(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg mb-2 flex items-center ${activeModule === module.id ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                  <span className="text-2xl mr-3">{module.icon}</span>
                  <div>
                    <h3 className="font-medium">{module.title}</h3>
                    <p className="text-xs text-gray-500">{module.lessons.length} lesson{module.lessons.length !== 1 ? 's' : ''}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          {currentModule && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center mb-2">
                  <span className="text-3xl mr-3">{currentModule.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-800">{currentModule.title}</h2>
                </div>
                <p className="text-gray-600">Master essential French phrases for {currentModule.title.toLowerCase()} situations.</p>
              </div>

              <div className="p-4">
                {currentModule.lessons.map((lesson) => (
                  <div key={lesson.id} className="mb-4">
                    <button onClick={() => toggleLesson(lesson.id)} className={`w-full flex items-center justify-between p-4 rounded-lg ${expandedLesson === lesson.id ? 'bg-primary-50' : 'bg-gray-50'}`}>
                      <div className="flex items-center">
                        {lesson.completed ? (
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <Check size={14} className="text-green-600" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gray-200 mr-3"></div>
                        )}
                        <div className="text-left">
                          <h3 className="font-medium text-gray-800">{lesson.title}</h3>
                          <p className="text-xs text-gray-500">{lesson.description}</p>
                        </div>
                      </div>
                      {expandedLesson === lesson.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>

                    {expandedLesson === lesson.id && (
                      <div className="mt-4 pl-4">
                        {currentFlashcard ? (
                          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="text-sm font-medium text-gray-500">Flashcard {lesson.flashcards.findIndex(f => f.id === currentFlashcard.id) + 1} of {lesson.flashcards.length}</h4>
                              <button onClick={() => speakText(currentFlashcard.french)} className="p-2 rounded-full bg-primary-50 hover:bg-primary-100">
                                <Volume2 size={16} />
                              </button>
                            </div>

                            <div className="mb-4 text-center">
                              <h3 className="text-2xl font-bold text-gray-800 mb-1">{currentFlashcard.french}</h3>
                              {showTranslation && (
                                <div className="mt-4">
                                  <p className="text-lg text-gray-600">{currentFlashcard.english}</p>
                                  <p className="text-sm text-gray-500 mt-3 italic">"{currentFlashcard.example}"</p>
                                </div>
                              )}
                            </div>

                            <div className="flex justify-center">
                              {!showTranslation ? (
                                <Button onClick={() => setShowTranslation(true)} variant="primary">Show Translation</Button>
                              ) : (
                                <div className="flex gap-2">
                                  <Button variant="outline" onClick={() => {
                                    const currentIndex = lesson.flashcards.findIndex(f => f.id === currentFlashcard.id);
                                    const prevIndex = (currentIndex - 1 + lesson.flashcards.length) % lesson.flashcards.length;
                                    setActiveFlashcard(lesson.flashcards[prevIndex].id);
                                    setShowTranslation(false);
                                  }}>Previous</Button>
                                  <Button variant="primary" onClick={() => {
                                    const currentIndex = lesson.flashcards.findIndex(f => f.id === currentFlashcard.id);
                                    const nextIndex = (currentIndex + 1) % lesson.flashcards.length;
                                    setActiveFlashcard(lesson.flashcards[nextIndex].id);
                                    setShowTranslation(false);
                                  }}>Next</Button>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            {lesson.flashcards.map((flashcard) => (
                              <div key={flashcard.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                                <div className="flex justify-between items-center mb-1">
                                  <button onClick={() => handleFlashcardClick(flashcard.id)} className="text-left">
                                    <h4 className="font-medium text-gray-800">{flashcard.french}</h4>
                                    <p className="text-sm text-gray-500 truncate">{flashcard.english}</p>
                                  </button>
                                  <button onClick={() => speakText(flashcard.french)} title="Play pronunciation">
                                    <Volume2 size={18} className="text-primary-600" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default LanguagePage;