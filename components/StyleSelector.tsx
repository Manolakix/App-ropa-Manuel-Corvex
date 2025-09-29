
import React from 'react';

interface StyleSelectorProps {
  styles: string[];
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleChange }) => {
  return (
    <div className="w-full md:w-auto flex-grow">
      <label htmlFor="style-selector" className="sr-only">Select Photo Style</label>
      <select
        id="style-selector"
        value={selectedStyle}
        onChange={(e) => onStyleChange(e.target.value)}
        className="w-full bg-gray-700 border border-gray-600 text-white text-md rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-3 appearance-none"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '1.5em 1.5em',
            paddingRight: '2.5rem',
        }}
      >
        {styles.map(style => (
          <option key={style} value={style}>{style}</option>
        ))}
      </select>
    </div>
  );
};

export default StyleSelector;
