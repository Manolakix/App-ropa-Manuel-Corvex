
import { GoogleGenAI, Modality } from "@google/genai";
import type { ImageFile, GeneratedImages } from '../types';

// IMPORTANT: This check is for the browser environment where process.env is not defined.
// In a production environment, API keys should be handled securely.
const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : "";
if (!apiKey) {
  console.warn("API_KEY is not set. Please set it in your environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey! });
const modelName = 'gemini-2.5-flash-image-preview';


const imageFileToPart = (file: ImageFile) => ({
    inlineData: {
        data: file.base64,
        mimeType: file.mimeType,
    },
});

const generateImage = async (parts: ReturnType<typeof imageFileToPart>[], prompt: string): Promise<string> => {
    const textPart = { text: prompt };
    const allParts = [...parts, textPart];

    try {
        const response = await ai.models.generateContent({
            model: modelName,
            contents: { parts: allParts },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                }
            }
        }
        
        throw new Error("API response did not contain an image part.");

    } catch (error) {
        console.error("Error generating image with Gemini:", error);
        throw new Error("Failed to communicate with the AI model.");
    }
};

export const generateCompositeImages = async (
    images: { scenario: ImageFile, model: ImageFile, clothing1: ImageFile, clothing2: ImageFile, clothing3: ImageFile, accessory: ImageFile },
    style: string,
    color: string
): Promise<GeneratedImages> => {
    const imageParts = [
        imageFileToPart(images.scenario),
        imageFileToPart(images.model),
        imageFileToPart(images.clothing1),
        imageFileToPart(images.clothing2),
        imageFileToPart(images.clothing3),
        imageFileToPart(images.accessory),
    ];

    const colorInstruction = `The overall color palette should be heavily influenced by the hex color '${color}'. Use it to guide the lighting, mood, and background tones.`;

    const artisticPrompt = `Using the provided scenario image as the base, create a high-quality, artistic advertising photograph in a '${style}' style. Seamlessly integrate the provided model. The model should be styled wearing the three provided clothing items together with the accessory in a fashionable and coherent outfit. The final composition must be professional and visually stunning. ${colorInstruction}`;
    const expositoryPrompt = `Using the provided scenario image as a subtle, clean background, create a well-lit product-focused image. Arrange the model, the three clothing items, and the accessory in a clear, expository composition, like a high-end catalog or lookbook. Each element must be distinct and easily identifiable. The model should be wearing all three clothing items and the accessory. ${colorInstruction}`;

    const [artisticResult, expositoryResult] = await Promise.all([
        generateImage(imageParts, artisticPrompt),
        generateImage(imageParts, expositoryPrompt),
    ]);

    return {
        artistic: artisticResult,
        expository: expositoryResult,
    };
};
