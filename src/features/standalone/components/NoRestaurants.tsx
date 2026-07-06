import Button from '@/shared/components/Button';
import { Store } from 'lucide-react';
import React from 'react';

const NoRestaurants: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-white px-6">
      <div className="w-full max-w-md text-center">
        {/* Illustration */}
        <div className="mb-10 flex justify-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
            <Store className="h-16 w-16 text-gray-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-gray-800">No restaurants available</h1>

        {/* Subtitle */}
        <p className="mt-4 text-gray-500">
          We couldn't find any restaurants in your area at the moment. Please try another location or check back later.
        </p>

        {/* Button */}
        <div className="mx-auto my-12 w-[320px]">
          <Button onClickHandler={() => {}}>Retry</Button>
        </div>
      </div>
    </div>
  );
};

export default NoRestaurants;
