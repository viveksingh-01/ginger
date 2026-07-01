type ButtonProps = {
  children: string;
};

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className="w-full py-4 text-sm font-semibold text-white bg-ginger hover:bg-ginger-dark cursor-pointer transition">
      {children}
    </button>
  );
};

export default Button;
