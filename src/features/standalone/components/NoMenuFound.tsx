import Button from '@/shared/components/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoMenuFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-12 flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md text-center">
        {/* Title */}
        <h1 className="text-xl font-bold text-gray-800">No menu available</h1>

        {/* Subtitle */}
        <p className="mt-2 text-gray-500">
          This restaurant hasn't added its menu yet. Explore other restaurants nearby.
        </p>

        {/* Button */}
        <div className="mx-auto my-8 w-[320px]">
          <Button onClickHandler={() => navigate('/')}>EXPLORE RESTAURANTS</Button>
        </div>
      </div>
    </div>
  );
};

export default NoMenuFound;
