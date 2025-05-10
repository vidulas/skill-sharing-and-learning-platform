import React from 'react';
interface OptionButtonProps {
  option: string;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}
export const OptionButton: React.FC<OptionButtonProps> = ({
  option,
  index,
  isSelected,
  onClick
}) => {
  const letters = ['A', 'B', 'C', 'D'];
  return <button onClick={onClick} className={`flex items-center w-full p-4 mb-3 rounded-lg border transition-all ${isSelected ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-gray-300 hover:bg-gray-50'}`}>
      <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
        {letters[index]}
      </div>
      <span className="text-left">{option}</span>
    </button>;
};