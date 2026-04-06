import { useState } from 'react';

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
};

const Input: React.FC<Props> = ({ label, value, onChange, type = 'text', error }) => {
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || value;

  return (
    <div className="w-full">
      <div className={`relative border-b transition-all duration-200 ${error ? 'border-red-500' : 'border-gray-300'}`}>
        <input
          type={type}
          value={value}
          onFocus={() => setIsFocused(true)}
          onChange={e => onChange(e.target.value)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-4 pt-8 pb-4 outline-none text-sm bg-transparent"
        />

        <label
          className={`absolute left-4 transition-all duration-200 pointer-events-none ${
            isActive
              ? `top-3 text-xs ${error ? 'text-red-500' : 'text-gray-500'}`
              : `top-1/2 -translate-y-1/2 ${error ? 'text-red-500' : 'text-gray-400'}`
          }`}
        >
          {error ? error : label}
        </label>
      </div>
    </div>
  );
};

export default Input;
