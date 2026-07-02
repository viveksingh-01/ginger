type ButtonProps = {
  children: string;
  isDisabled: boolean;
  onClickHandler: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, isDisabled, onClickHandler }) => {
  return (
    <button
      onClick={onClickHandler}
      className="w-full py-4 text-sm font-semibold text-white bg-ginger hover:bg-ginger-dark cursor-pointer transition"
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
