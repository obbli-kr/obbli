interface ButtonProps {
  onClick: ()=> void;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const Button = ({ onClick, size = 'md', children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`group rounded-lg border border-transparent px-5 py-4 transition-colors
        ${ size === 'sm' && 'text-sm' },
        ${ size === 'md' && 'text-base' },
        ${ size === 'lg' && 'text-lg' },
        hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
    >
      {children}
    </button>
  );
};

export default Button;
