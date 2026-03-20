import { ClockIcon } from 'lucide-react';

type ComingSoonProps = {
  title?: string;
  description?: string;
};

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = 'Coming Soon...',
  description = 'This feature will be available soon. Stay tuned!',
}: ComingSoonProps) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <ClockIcon className="w-16 h-16 mx-auto text-ginger mb-4 animate-pulse" />
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-600 mb-2">{title}</h1>
        {/* Description */}
        <p className="text-gray-500 mb-6">{description}</p>
        {/* CTA */}
        <button
          onClick={() => window.history.back()}
          className="px-8 py-3 bg-ginger text-white transition cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
