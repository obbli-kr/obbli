interface ButtonProps {
  onClick?: ()=> void;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const Button = ({ onClick, size = 'md', children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`group rounded-lg border border-transparent px-3 py-2 transition-colors
        ${ size === 'sm' && 'text-sm' },
        ${ size === 'md' && 'text-base' },
        ${ size === 'lg' && 'text-lg' },
        hover:border-orange-500 hover:bg-orange-100 hover:dark:border-orange-600 hover:dark:bg-orange-200`}
    >
      {children}
    </button>
  );
};

export default Button;
