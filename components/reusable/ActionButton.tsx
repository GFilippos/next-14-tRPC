'use client';

import Loader from './Loader';

type ActionButtonProps = {
  variant: 'create' | 'update' | 'delete';
  isLoading?: boolean;
  onClick: () => void;
};

const ActionButton = ({ variant, isLoading, onClick }: ActionButtonProps) => {
  const buttonStyles: { [key: string]: string } = {
    create: 'bg-blue-600 text-white hover:bg-blue-700',
    update: 'bg-amber-500 text-white hover:bg-amber-600',
    delete: 'bg-red-700 text-white hover:bg-red-600',
  };

  const currentStyle = buttonStyles[variant];

  return (
    <button onClick={onClick} className={`px-4 py-2 rounded ${currentStyle}`} disabled={isLoading}>
      {isLoading ? <Loader /> : variant.charAt(0).toUpperCase() + variant.slice(1) + ' User'}
    </button>
  );
};

export default ActionButton;
