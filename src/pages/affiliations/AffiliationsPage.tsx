import React from 'react';
import { motion } from 'framer-motion';
import { Link, ExternalLink, Building, Home, ShoppingBag, Train, Languages } from 'lucide-react';
import Button from '../../components/ui/Button';

const AffiliationsPage: React.FC = () => {
  // Sample affiliate data
  const affiliates = [
    {
      id: 1,
      category: 'language',
      name: 'Alliance Française',
      description: 'Learn French with the world\'s leading French language and cultural center.',
      logo: <Languages size={32} className="text-primary-600" />,
      link: 'https://www.alliancefr.org',
    },
    {
      id: 2,
      category: 'finance',
      name: 'Wise',
      description: 'Transfer money internationally at real exchange rates with low fees.',
      logo: <ExternalLink size={32} className="text-green-600" />,
      link: 'https://wise.com',
    },
    {
      id: 3,
      category: 'finance',
      name: 'Revolut',
      description: 'Digital banking alternative with multi-currency accounts and global spending.',
      logo: <ExternalLink size={32} className="text-blue-600" />,
      link: 'https://www.revolut.com',
    },
    {
      id: 4,
      category: 'housing',
      name: 'Studapart',
      description: 'Platform for finding student accommodation in France.',
      logo: <Home size={32} className="text-orange-600" />,
      link: 'https://www.studapart.com',
    },
    {
      id: 5,
      category: 'housing',
      name: 'LivinFrance',
      description: 'Comprehensive platform for international students to find housing and services.',
      logo: <Home size={32} className="text-blue-600" />,
      link: 'https://livin-france.com',
    },
    {
      id: 6,
      category: 'grocery',
      name: 'Carrefour',
      description: 'Major supermarket chain with online delivery services.',
      logo: <ShoppingBag size={32} className="text-red-600" />,
      link: 'https://www.carrefour.fr',
    },
    {
      id: 7,
      category: 'grocery',
      name: 'Monoprix',
      description: 'Grocery store with quality products and home delivery.',
      logo: <ShoppingBag size={32} className="text-purple-600" />,
      link: 'https://www.monoprix.fr',
    },
    {
      id: 8,
      category: 'transport',
      name: 'RATP (Paris)',
      description: 'Public transportation network in Paris with various pass options.',
      logo: <Train size={32} className="text-green-600" />,
      link: 'https://www.ratp.fr',
    },
    {
      id: 9,
      category: 'transport',
      name: 'SNCF',
      description: 'French national railway company for traveling between cities.',
      logo: <Train size={32} className="text-blue-600" />,
      link: 'https://www.sncf.com',
    },
  ];
  
  // Group affiliates by category
  const groupedAffiliates: Record<string, typeof affiliates> = {};
  affiliates.forEach(affiliate => {
    if (!groupedAffiliates[affiliate.category]) {
      groupedAffiliates[affiliate.category] = [];
    }
    groupedAffiliates[affiliate.category].push(affiliate);
  });
  
  // Category display names
  const categoryNames: Record<string, string> = {
    language: 'Language Schools',
    finance: 'Money Transfer & Banking',
    housing: 'Student Housing',
    grocery: 'Grocery Delivery',
    transport: 'Local Transport',
  };
  
  // Category icons
  const categoryIcons: Record<string, React.ReactNode> = {
    language: <Languages size={24} />,
    finance: <ExternalLink size={24} />,
    housing: <Building size={24} />,
    grocery: <ShoppingBag size={24} />,
    transport: <Train size={24} />,
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="page-container"
    >
      <div className="section-title">
        <Link size={24} />
        Our Partners
      </div>
      
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-600 mb-6">
          We've partnered with these trusted services to help make your transition to studying in France smoother. 
          These recommendations are based on feedback from current and former international students.
        </p>
        
        {Object.keys(groupedAffiliates).map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">{categoryIcons[category]}</span>
              {categoryNames[category]}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedAffiliates[category].map((affiliate) => (
                <div key={affiliate.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="mr-3">{affiliate.logo}</div>
                    <h3 className="font-semibold text-lg">{affiliate.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{affiliate.description}</p>
                  <a
                    href={affiliate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 text-sm font-medium flex items-center hover:underline"
                  >
                    Visit Website
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="bg-primary-50 rounded-lg p-6 mt-6">
          <h3 className="font-semibold text-primary-800 mb-2">
            Partner with Us
          </h3>
          <p className="text-primary-700 text-sm mb-4">
            Are you a service provider that helps international students in France? 
            We're always looking to expand our network of trusted partners.
          </p>
          <Button variant="primary">
            Contact Us
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AffiliationsPage;