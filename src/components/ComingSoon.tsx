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
        <ClockIcon className="w-16 h-16 mx-auto text-gray-400 mb-4 animate-pulse" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-500 mb-6">{description}</p>
      </div>
    </div>
  );
};

export default ComingSoon;
