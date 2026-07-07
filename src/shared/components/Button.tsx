import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: string;
  onClickHandler: () => void;
  isDisabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

const Button: React.FC<ButtonProps> = ({ children, onClickHandler, isDisabled = false, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClickHandler}
      className={`w-full py-4 text-sm font-semibold text-white transition
        ${isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-ginger hover:bg-ginger-dark cursor-pointer'}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
