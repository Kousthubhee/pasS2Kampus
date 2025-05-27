import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, User, Calendar, MessageCircle, ThumbsUp, Send } from 'lucide-react';
import Button from '../../components/ui/Button';

const HubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [inputValue, setInputValue] = useState('');
  
  // Sample discussions
  const discussions = [
    {
      id: 1,
      category: 'askSeniors',
      author: 'Priya Sharma',
      title: 'How is the student life at NEOMA Reims?',
      content: 'I got admitted to NEOMA Business School at Reims campus. Can seniors share their experiences about accommodation, social life, and academics there?',
      timestamp: '2 hours ago',
      likes: 12,
      comments: 8,
    },
    {
      id: 2,
      category: 'experiences',
      author: 'Rahul Jain',
      title: 'My first month in Paris - The ups and downs',
      content: 'It\'s been a month since I arrived in Paris to study at ESSEC. Here\'s what I\'ve learned about finding accommodation, dealing with paperwork, and making friends.',
      timestamp: '1 day ago',
      likes: 45,
      comments: 22,
    },
    {
      id: 3,
      category: 'resources',
      author: 'Ananya Patel',
      title: 'List of useful apps for Indian students in France',
      content: 'I\'ve compiled a list of essential apps that helped me navigate life in France - from transportation to food delivery to language learning.',
      timestamp: '3 days ago',
      likes: 78,
      comments: 14,
    },
    {
      id: 4,
      category: 'askSeniors',
      author: 'Vikram Singh',
      title: 'Job opportunities after MSc Finance in France',
      content: 'I\'m considering applying for MSc Finance programs in France. Can anyone share insights about job prospects for international students after graduation?',
      timestamp: '5 days ago',
      likes: 32,
      comments: 18,
    },
    {
      id: 5,
      category: 'experiences',
      author: 'Neha Gupta',
      title: 'Weekend trips from Lyon - My adventures',
      content: 'Since starting my studies at emlyon in Lyon, I\'ve been exploring nearby cities on weekends. Here are some affordable and amazing places to visit!',
      timestamp: '1 week ago',
      likes: 61,
      comments: 26,
    },
  ];
  
  // Filter discussions based on active tab
  const filteredDiscussions = activeTab === 'all' 
    ? discussions 
    : discussions.filter(disc => disc.category === activeTab);
  
  const handlePostDiscussion = () => {
    // In a real app, this would post a new discussion
    if (inputValue.trim()) {
      alert('In a real app, this would post: ' + inputValue);
      setInputValue('');
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container"
    >
      <div className="section-title">
        <Users size={24} />
        Student Community Hub
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Categories */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'all'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              All Discussions
            </button>
            <button
              onClick={() => setActiveTab('askSeniors')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'askSeniors'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Ask Seniors
            </button>
            <button
              onClick={() => setActiveTab('experiences')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'experiences'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Share Experiences
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'resources'
                  ? 'border-b-2 border-primary-500 text-primary-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Resources
            </button>
          </div>
        </div>
        
        {/* New discussion input */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <User size={20} className="text-primary-600" />
            </div>
            <div className="flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Share your question or experience..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent min-h-[100px]"
              ></textarea>
              <div className="flex justify-end mt-2">
                <Button
                  onClick={handlePostDiscussion}
                  rightIcon={<Send size={16} />}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Discussion list */}
        <div className="divide-y divide-gray-200">
          {filteredDiscussions.map((discussion) => (
            <div key={discussion.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <User size={20} className="text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{discussion.author}</span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {discussion.timestamp}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{discussion.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{discussion.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button className="flex items-center gap-1 hover:text-primary-600">
                      <ThumbsUp size={16} />
                      <span>{discussion.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary-600">
                      <MessageCircle size={16} />
                      <span>{discussion.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HubPage;