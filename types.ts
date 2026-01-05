
export enum DesignStyle {
  BEAUTY = 'BEAUTY',
  DEMON = 'DEMON'
}

export interface DesignBlueprint {
  title: string;
  description: string;
  elements: string[];
  carvingTechniques: string[];
  philosophy: string;
}

export interface GenerationResult {
  imageUrl?: string;
  blueprint?: DesignBlueprint;
  loading: boolean;
  error?: string;
}
