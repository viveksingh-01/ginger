type ButtonProps = {
  children: string;
  onClickHandler: () => void;
  isDisabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, onClickHandler, isDisabled = false }) => {
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
