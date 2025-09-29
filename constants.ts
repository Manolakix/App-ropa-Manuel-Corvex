
import { ImageType } from './types';

export const PHOTO_STYLES: string[] = [
  "Cinematic High Contrast",
  "Ethereal Soft Focus",
  "Minimalist Clean Studio",
  "Gritty Urban Realism",
  "Vintage Film Grain",
  "Surreal & Avant-Garde",
  "Dynamic Action Shot",
];

export const IMAGE_SLOTS: { id: ImageType; label: string }[] = [
    { id: ImageType.Scenario, label: "Scenario" },
    { id: ImageType.Model, label: "Model" },
    { id: ImageType.Clothing1, label: "Clothing 1" },
    { id: ImageType.Clothing2, label: "Clothing 2" },
    { id: ImageType.Clothing3, label: "Clothing 3" },
    { id: ImageType.Accessory, label: "Accessory" },
];

export const COLOR_SWATCHES: { name: string; hex: string }[] = [
    { name: "White", hex: "#FFFFFF" },
    { name: "Black", hex: "#000000" },
    { name: "Crimson Red", hex: "#DC143C" },
    { name: "Royal Blue", hex: "#4169E1" },
    { name: "Forest Green", hex: "#228B22" },
    { name: "Gold", hex: "#FFD700" },
    { name: "Hot Pink", hex: "#FF69B4" },
    { name: "Deep Purple", hex: "#800080" },
    { name: "Burnt Orange", hex: "#CC5500" },
    { name: "Teal", hex: "#008080" },
];
