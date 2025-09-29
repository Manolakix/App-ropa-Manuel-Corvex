
import React from 'react';

interface ColorSelectorProps {
  colors: { name: string; hex: string }[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColor, onColorChange }) => {
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      <span className="text-gray-400 text-sm font-medium mr-2 hidden sm:block">Color:</span>
      <div className="flex items-center space-x-2">
        {colors.map(({ name, hex }) => (
          <button
            key={hex}
            type="button"
            aria-label={`Select color ${name}`}
            onClick={() => onColorChange(hex)}
            className={`w-6 h-6 rounded-full transition-transform duration-200 ease-in-out focus:outline-none ${selectedColor === hex ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-purple-500 scale-110' : 'hover:scale-110'}`}
            style={{ backgroundColor: hex, border: hex === '#FFFFFF' || hex === '#ffffff' ? '1px solid #4B5563' : 'none' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
