export type CompressionLevel = 'low' | 'medium' | 'high';
export type ImageStatus = 'queued' | 'compressing' | 'done' | 'error';
export interface ProcessedImage {
  id: string;
  file: File;
  status: ImageStatus;
  progress: number;
  originalSize: number;
  compressedSize?: number;
  compressedBlob?: Blob;
  previewUrl: string;
  error?: string;
}