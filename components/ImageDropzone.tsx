
import React, { useState, useCallback } from 'react';
import type { ImageFile } from '../types';
import UploadIcon from './icons/UploadIcon';

interface ImageDropzoneProps {
  label: string;
  onImageDrop: (file: ImageFile) => void;
  imagePreview: string | null;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ label, onImageDrop, imagePreview }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          const dataUrl = loadEvent.target?.result as string;
          const base64 = dataUrl.split(',')[1];
          const mimeType = file.type;
          onImageDrop({ name: file.name, base64, mimeType, dataUrl });
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please drop an image file.");
      }
    }
  }, [onImageDrop]);

  const borderStyle = isDraggingOver ? 'border-purple-500' : 'border-gray-600';

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative w-full aspect-square bg-gray-800 border-2 border-dashed ${borderStyle} rounded-lg flex flex-col items-center justify-center text-center p-4 transition-all duration-300 cursor-pointer group hover:border-purple-400`}
    >
      {imagePreview ? (
        <>
            <img src={imagePreview} alt={label} className="absolute inset-0 w-full h-full object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <p className="text-white font-semibold text-lg">Drop to replace</p>
            </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <UploadIcon className="w-12 h-12 mb-2 text-gray-500 group-hover:text-purple-400 transition-colors" />
          <p className="font-semibold text-lg">{label}</p>
          <p className="text-sm">Drag & drop an image here</p>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
