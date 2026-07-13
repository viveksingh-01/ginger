import Button from '@/shared/components/Button';
import { UtensilsCrossed } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NoMenuFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-12 flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md text-center">
        {/* Illustration */}
        <div className="mb-10 flex justify-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
            <UtensilsCrossed className="h-16 w-16 text-gray-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-800">Menu not available :(</h1>

        {/* Subtitle */}
        <p className="mt-2 text-gray-500 text-sm">
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
