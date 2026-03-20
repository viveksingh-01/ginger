import { ClockIcon } from 'lucide-react';

type ComingSoonProps = {
  title?: string;
  description?: string;
};

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = 'Coming Soon...',
  description = 'We’re working on this feature. It’ll be available shortly.',
}) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6">
      {/* Icon */}
      <div className="mb-6">
        <ClockIcon className="w-16 h-16 mx-auto text-ginger animate-pulse" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-2">{title}</h1>

      {/* Description */}
      <p className="text-gray-500 text-center max-w-md mb-8 leading-relaxed">{description}</p>

      {/* CTA */}
      <button
        onClick={() => window.history.back()}
        className="px-8 py-3 bg-ginger text-white hover:bg-ginger-dark cursor-pointer transition-colors duration-200"
      >
        Go back
      </button>
    </div>
  );
};

export default ComingSoon;
