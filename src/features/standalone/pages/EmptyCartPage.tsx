import Button from '@/shared/components/Button';
import { ShoppingBag } from 'lucide-react';
import React from 'react';

const EmptyCartPage: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-white px-6">
      <div className="w-full max-w-md text-center">
        {/* Illustration */}
        <div className="mb-10 flex justify-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-100">
            <ShoppingBag className="h-16 w-16 text-gray-400" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-gray-800">Your cart is empty</h1>

        {/* Subtitle */}
        <p className="mt-2 text-gray-500">You can go to home page to view more restaurants</p>

        {/* Button */}
        <div className="w-[320px] mx-auto my-8">
          <Button>SEE RESTAURANTS NEAR YOU</Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyCartPage;
