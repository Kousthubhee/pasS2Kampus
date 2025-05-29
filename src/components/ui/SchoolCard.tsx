import React from 'react';
import { MapPin, Users, DollarSign } from 'lucide-react';
import { School } from '../../types/school';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

interface SchoolCardProps {
  school: School;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={school.imageUrl} 
          alt={school.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{school.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin size={16} className="mr-2" />
          <span className="text-sm">{school.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <Users size={16} className="mr-2" />
          <span className="text-sm">{school.campuses.length} Campus{school.campuses.length !== 1 ? 'es' : ''}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <DollarSign size={16} className="mr-2" />
          <span className="text-sm">{school.costOfLiving} estimated monthly cost</span>
        </div>
        
        <Button
          variant="primary"
          fullWidth
          onClick={() => navigate(`/school/${school.id}`)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default SchoolCard;