
import React, { useState, useMemo } from 'react';
import ImageDropzone from './components/ImageDropzone';
import StyleSelector from './components/StyleSelector';
import ColorSelector from './components/ColorSelector';
import Spinner from './components/Spinner';
import { generateCompositeImages } from './services/geminiService';
import { PHOTO_STYLES, IMAGE_SLOTS, COLOR_SWATCHES } from './constants';
import type { ImageState, ImageFile, GeneratedImages, ImageType } from './types';

const App: React.FC = () => {
    const [images, setImages] = useState<ImageState>({});
    const [selectedStyle, setSelectedStyle] = useState<string>(PHOTO_STYLES[0]);
    const [selectedColor, setSelectedColor] = useState<string>(COLOR_SWATCHES[0].hex);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<GeneratedImages | null>(null);

    const handleImageDrop = (imageType: ImageType) => (file: ImageFile) => {
        setImages(prev => ({ ...prev, [imageType]: file }));
    };

    const areAllImagesUploaded = useMemo(() => {
        return IMAGE_SLOTS.every(slot => !!images[slot.id]);
    }, [images]);

    const handleSubmit = async () => {
        if (!areAllImagesUploaded) {
            setError("Please upload all six images.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImages(null);

        try {
            const imageFiles = {
                scenario: images.Scenario!,
                model: images.Model!,
                clothing1: images.Clothing1!,
                clothing2: images.Clothing2!,
                clothing3: images.Clothing3!,
                accessory: images.Accessory!,
            };
            const result = await generateCompositeImages(imageFiles, selectedStyle, selectedColor);
            setGeneratedImages(result);
        } catch (err) {
            console.error(err);
            setError("Failed to generate images. Please check the console for details.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            <div className="container mx-auto p-4 md:p-8">
                <header className="text-center mb-8 md:mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        AI Fashion Ad Creator
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">
                        Fuse images into stunning, high-quality advertisements with AI.
                    </p>
                </header>

                <main>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {IMAGE_SLOTS.map(slot => (
                            <ImageDropzone
                                key={slot.id}
                                label={slot.label}
                                imagePreview={images[slot.id]?.dataUrl ?? null}
                                onImageDrop={handleImageDrop(slot.id)}
                            />
                        ))}
                    </div>

                    {areAllImagesUploaded && (
                        <div className="bg-gray-800 rounded-lg p-6 flex flex-col md:flex-row items-center justify-center gap-4 mb-8 shadow-lg transition-all duration-500 ease-in-out transform scale-100">
                            <StyleSelector
                                styles={PHOTO_STYLES}
                                selectedStyle={selectedStyle}
                                onStyleChange={setSelectedStyle}
                            />
                            <ColorSelector
                                colors={COLOR_SWATCHES}
                                selectedColor={selectedColor}
                                onColorChange={setSelectedColor}
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full mt-4 md:mt-0 md:w-auto bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 shadow-md flex-shrink-0"
                            >
                                {isLoading ? 'Generating...' : 'Generate Images'}
                            </button>
                        </div>
                    )}
                    
                    {error && (
                         <div className="text-center p-4 my-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg">
                            <p>{error}</p>
                        </div>
                    )}


                    <div className="mt-12">
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center text-center">
                                <Spinner />
                                <p className="text-gray-400 mt-4 text-lg">AI is crafting your images... this may take a moment.</p>
                            </div>
                        )}

                        {generatedImages && (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
                                    <h3 className="text-2xl font-semibold mb-4 text-center text-gray-300">Artistic Composition</h3>
                                    <img src={generatedImages.artistic} alt="Artistic AI generated composition" className="w-full h-auto object-cover rounded-md aspect-square" />
                                </div>
                                <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
                                    <h3 className="text-2xl font-semibold mb-4 text-center text-gray-300">Expository View</h3>
                                    <img src={generatedImages.expository} alt="Expository AI generated composition" className="w-full h-auto object-cover rounded-md aspect-square" />
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
