
export enum ImageType {
  Scenario = 'Scenario',
  Model = 'Model',
  Clothing1 = 'Clothing1',
  Clothing2 = 'Clothing2',
  Clothing3 = 'Clothing3',
  Accessory = 'Accessory',
}

export interface ImageFile {
  name: string;
  base64: string;
  mimeType: string;
  dataUrl: string;
}

export type ImageState = {
  [key in ImageType]?: ImageFile;
};

export interface GeneratedImages {
    artistic: string;
    expository: string;
}
