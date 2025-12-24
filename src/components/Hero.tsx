import React from "react";
import { FaFire, FaLeaf, FaMotorcycle } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden text-center">
      {/* Full-screen gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-white via-orange-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

      {/* Animated Wavy Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute left-[-50%] top-0 w-[200%] h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          <path
            className="wave-motion"
            fill="url(#waveGradient)"
            d="M0,64L48,80C96,96,192,128,288,160C384,192,480,224,576,208C672,192,768,128,864,106.7C960,85,1056,107,1152,122.7C1248,139,1344,149,1392,154.7L1440,160L1440,0L0,0Z"
          />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 flex flex-col items-center justify-center relative z-10 w-full max-w-5xl space-y-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
          Delicious meals, <span className="text-ginger">delivered fast!</span>
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg sm:text-2xl">
          Order from your favorite restaurants and get food delivered right to your doorstep. Fresh, hot, and ready to
          eat.
        </p>

        {/* Feature Cards */}
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <FeatureCard icon={<FaMotorcycle />} label="Fast Delivery" />
          <FeatureCard icon={<FaFire />} label="Hot Meals" />
          <FeatureCard icon={<FaLeaf />} label="Fresh Ingredients" />
        </div>
        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 mt-16 flex-wrap">
          <button className="bg-ginger text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-600 transition">
            Order Now
          </button>
          <button className="border border-ginger text-ginger font-semibold px-6 py-3 rounded-xl hover:bg-ginger hover:text-white transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div
    className="
        group
        flex items-center gap-2
        bg-white dark:bg-gray-800
        rounded-xl px-4 py-2
        shadow-sm
        transition-all duration-200 ease-out
        hover:-translate-y-[2px]
        hover:shadow-md
      "
  >
    <div
      className="
          text-ginger
          transition-transform duration-200
          group-hover:scale-110
        "
    >
      {icon}
    </div>
    <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
  </div>
);

export default Hero;
