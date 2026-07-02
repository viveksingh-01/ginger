type ButtonProps = {
  children: string;
  onClickHandler: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, onClickHandler }) => {
  return (
    <button
      onClick={onClickHandler}
      className="w-full py-4 text-sm font-semibold text-white bg-ginger hover:bg-ginger-dark cursor-pointer transition"
    >
      {children}
    </button>
  );
};

export default Button;
